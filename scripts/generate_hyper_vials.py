import cv2
import numpy as np
from PIL import Image, ImageChops, ImageEnhance
import os

def warp_label(img_path):
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        return None
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    
    h, w = img.shape[:2]
    # Subtle cylinder curve
    f = 800
    camera_dist = 800
    
    K = np.array([[f, 0, w/2], [0, f, h/2], [0, 0, 1]])
    
    x, y = np.meshgrid(np.arange(w), np.arange(h))
    x_c = x - w/2
    y_c = y - h/2
    
    theta = x_c / f
    x_p = np.sin(theta) * camera_dist
    z_p = np.cos(theta) * camera_dist
    
    x_img = (x_p * f / z_p) + w/2
    y_img = (y_c * camera_dist / z_p) + h/2
    
    map_x = x_img.astype(np.float32)
    map_y = y_img.astype(np.float32)
    
    warped = cv2.remap(img, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))
    
    # Crop bounding box of non-transparent pixels
    alpha = warped[:,:,3]
    coords = cv2.findNonZero(alpha)
    if coords is not None:
        x_min, y_min, w_c, h_c = cv2.boundingRect(coords)
        warped = warped[y_min:y_min+h_c, x_min:x_min+w_c]
        
    warped_pil = Image.fromarray(cv2.cvtColor(warped, cv2.COLOR_BGRA2RGBA))
    return warped_pil

TEMPLATE_PATH = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/generic_vial_template_clean.png"
LABELS_DIR = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/images/labels"
OUTPUT_DIR = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/products/generated"

os.makedirs(OUTPUT_DIR, exist_ok=True)
base_img = Image.open(TEMPLATE_PATH).convert("RGBA")

glass_left = 360
glass_right = 660
glass_width = glass_right - glass_left

target_w = glass_width - 4
x_offset = glass_left + 2
y_offset = 420 

mapping = {
    1: "bpc-157-5mg.png",
    2: "bpc-157-10mg.png",
    3: "tb-500-2mg.png",
    4: "tb-500-5mg.png",
    5: "ghk-cu-50mg.png",
    6: "ghk-cu-100mg.png",
    7: "retatrutide-5mg.png",
    8: "retatrutide-10mg.png",
    9: "retatrutide-15mg.png",
    10: "wolverine-stack-10mg.png",
    11: "wolverine-stack-20mg.png",
    12: "epithalon-10mg.png",
    13: "aod9604-5mg.png",
    14: "selank-5mg.png",
    15: "cjc-1295-2mg-dac.png",
    16: "cjc-1295-5mg-dac.png",
    17: "cjc-1295-2mg-nodac.png",
    18: "ipamorelin-2mg.png",
    19: "ipamorelin-5mg.png",
    20: "hgh-10iu.png",
    21: "hgh-15iu.png",
    22: "hgh-20iu.png"
}

print(f"Generating {len(mapping)} hyper-realistic vial images...")

for num, out_filename in mapping.items():
    label_path = os.path.join(LABELS_DIR, f"{num}.jpg")
    if not os.path.exists(label_path):
        continue
        
    label_img = warp_label(label_path)
    if label_img is None: continue
    
    aspect = label_img.height / label_img.width
    target_h = int(target_w * aspect)
    label_img = label_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    lighting_crop = base_img.crop((x_offset, y_offset, x_offset + target_w, y_offset + target_h))
    lighting_gray = lighting_crop.convert("L")
    enhancer = ImageEnhance.Contrast(lighting_gray)
    lighting_gray = enhancer.enhance(1.8)
    
    lighting_rgb = Image.new("RGB", lighting_gray.size)
    lighting_rgb.paste(lighting_gray)
    
    label_rgb = label_img.convert("RGB")
    blended_label = ImageChops.multiply(label_rgb, lighting_rgb)
    screen_highlight = ImageChops.screen(blended_label, lighting_rgb)
    blended_final = Image.composite(screen_highlight, blended_label, lighting_gray)
    blended_final.putalpha(label_img.getchannel("A"))
    
    result = base_img.copy()
    result.paste(blended_final, (x_offset, y_offset), blended_final)
    
    out_path = os.path.join(OUTPUT_DIR, out_filename)
    result.save(out_path)
    print(f"  ✓ Generated: {out_filename}")

print("Done!")
