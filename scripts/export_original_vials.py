import os
from PIL import Image

TEMPLATE_PATH = "/Users/tonymac/.gemini/antigravity/brain/360471be-d892-48e0-999f-73100e714641/blank_vial_template_1778470249982.png"
LABELS_DIR = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/images/labels"
EXPORT_DIR = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/vial_photos_export"

os.makedirs(EXPORT_DIR, exist_ok=True)
base_img = Image.open(TEMPLATE_PATH).convert("RGBA")

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

# The screenshot the user attached showed the label pasted flat with width around 430 and y_offset 420.
label_w = 430
x_offset = 290
y_offset = 420

print(f"Exporting exactly as shown in your screenshot to {EXPORT_DIR}")

for num, out_filename in mapping.items():
    label_path = os.path.join(LABELS_DIR, f"{num}.jpg")
    if not os.path.exists(label_path):
        continue
        
    label_img = Image.open(label_path).convert("RGBA")
    
    aspect = label_img.height / label_img.width
    label_h = int(label_w * aspect)
    label_img = label_img.resize((label_w, label_h), Image.Resampling.LANCZOS)
    
    result = base_img.copy()
    result.paste(label_img, (x_offset, y_offset), label_img)
    
    out_path = os.path.join(EXPORT_DIR, out_filename)
    result.save(out_path)

print("Done exporting original gold cap vials.")
