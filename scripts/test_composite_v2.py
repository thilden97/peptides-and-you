import cv2
import numpy as np
from PIL import Image, ImageChops, ImageEnhance
import os

def warp_label(img_path):
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    
    h, w = img.shape[:2]
    # We want a subtle cylinder curve
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
    
    # The warp creates black/transparent borders. We need to crop it tightly.
    # Find bounding box of non-transparent pixels
    alpha = warped[:,:,3]
    coords = cv2.findNonZero(alpha)
    if coords is not None:
        x, y, w_c, h_c = cv2.boundingRect(coords)
        warped = warped[y:y+h_c, x:x+w_c]
        
    # Convert back to PIL
    warped_pil = Image.fromarray(cv2.cvtColor(warped, cv2.COLOR_BGRA2RGBA))
    return warped_pil

template_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/generic_vial_template.png"
label_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/images/labels/1.jpg"

base_img = Image.open(template_path).convert("RGBA")

# Exact glass boundaries
glass_left = 360
glass_right = 660
glass_width = glass_right - glass_left

# 1. Warp the label
label_img = warp_label(label_path)

# 2. Resize label to fit glass exactly (maybe leave 2px padding so it looks like it wraps)
target_w = glass_width - 4
# keep aspect ratio
aspect = label_img.height / label_img.width
target_h = int(target_w * aspect)
label_img = label_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

# 3. Paste position
x_offset = glass_left + 2
y_offset = 420 # roughly the middle of the vial

# 4. Extract lighting from the base image at the exact paste location
lighting_crop = base_img.crop((x_offset, y_offset, x_offset + target_w, y_offset + target_h))
# Convert to grayscale
lighting_gray = lighting_crop.convert("L")
# Enhance contrast to make highlights pop and shadows deepen
enhancer = ImageEnhance.Contrast(lighting_gray)
lighting_gray = enhancer.enhance(1.8)

# Now, we want to multiply the label by this lighting map.
# But `ImageChops.multiply` requires RGB images.
lighting_rgb = Image.new("RGB", lighting_gray.size)
lighting_rgb.paste(lighting_gray)

# Remove alpha from label temporarily for multiply
label_rgb = label_img.convert("RGB")
blended_label = ImageChops.multiply(label_rgb, lighting_rgb)

# To preserve extreme highlights (which multiply darkens), we screen the original lighting over it
screen_highlight = ImageChops.screen(blended_label, lighting_rgb)
# We only want to screen the brightest parts, so let's blend between multiply and screen based on the lighting map
blended_final = Image.composite(screen_highlight, blended_label, lighting_gray)

# Add the alpha channel back (using the original label's alpha which has the curved borders)
blended_final.putalpha(label_img.getchannel("A"))

# 5. Paste onto base image
result = base_img.copy()
result.paste(blended_final, (x_offset, y_offset), blended_final)

result.save("/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/test_composite_v2.png")
print("Saved test_composite_v2.png")
