"""
Generate product vial images by compositing exact label files onto a blank vial template.
Uses Pillow for image manipulation with perspective warping for realism.
"""
from PIL import Image, ImageEnhance, ImageFilter
import os
import numpy as np

# Paths
TEMPLATE_PATH = "generic_vial_template.png"
LABELS_DIR = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/images/labels"
OUTPUT_DIR = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/products/generated"

# Label-to-product mapping (label_number: output_filename)
LABEL_MAP = {
    1:  "bpc-157-5mg.png",
    2:  "bpc-157-10mg.png",
    3:  "tb-500-2mg.png",
    4:  "tb-500-5mg.png",
    5:  "ghk-cu-50mg.png",
    6:  "ghk-cu-100mg.png",
    7:  "retatrutide-5mg.png",
    8:  "retatrutide-10mg.png",
    9:  "retatrutide-15mg.png",
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
    22: "hgh-20iu.png",
}


def apply_perspective(label_img, width, height):
    """Apply a subtle perspective warp to simulate wrapping around a cylindrical vial."""
    # Create slightly curved perspective - narrower at edges
    # Using a simple quad transform for subtle 3D effect
    coeffs = find_coeffs(
        [(0, 0), (width, 0), (width, height), (0, height)],  # target
        [(8, 4), (width - 8, 4), (width - 2, height - 4), (2, height - 4)]  # source (slightly pinched top)
    )
    return label_img.transform((width, height), Image.PERSPECTIVE, coeffs, Image.BICUBIC)


def find_coeffs(target_coords, source_coords):
    """Find perspective transform coefficients."""
    matrix = []
    for s, t in zip(source_coords, target_coords):
        matrix.append([t[0], t[1], 1, 0, 0, 0, -s[0]*t[0], -s[0]*t[1]])
        matrix.append([0, 0, 0, t[0], t[1], 1, -s[1]*t[0], -s[1]*t[1]])
    A = np.matrix(matrix, dtype=float)
    B = np.array([coord for pair in source_coords for coord in pair], dtype=float)
    res = np.dot(np.linalg.inv(A.T * A) * A.T, B)
    return np.array(res).reshape(8).tolist()


def create_glass_overlay(label_img):
    """Add a subtle glass reflection effect over the label."""
    overlay = Image.new('RGBA', label_img.size, (0, 0, 0, 0))
    w, h = label_img.size
    
    # Create a vertical gradient for glass sheen
    for x in range(w):
        # Subtle highlight on the left-center area
        intensity = int(25 * max(0, 1 - abs(x - w * 0.35) / (w * 0.25)))
        for y in range(h):
            if intensity > 0:
                overlay.putpixel((x, y), (255, 255, 255, intensity))
    
    return overlay


def composite_label_on_vial(template_path, label_path, output_path):
    """Composite a label image onto the blank vial template."""
    # Open template and label
    template = Image.open(template_path).convert('RGBA')
    label = Image.open(label_path).convert('RGBA')
    
    tw, th = template.size  # 1024x1024 expected
    
    # === Label positioning on the vial ===
    # The vial body spans roughly from x=380 to x=644 (width ~264px)
    # and from y=280 to y=720 (height ~440px)
    # Label should wrap around the middle section
    
    label_width = int(tw * 0.34)   # ~348px wide — covers the vial front
    label_height = int(th * 0.17)  # ~174px tall — proportional to actual label ratio (4.8:1.8)
    
    # Resize label to fit vial proportionally
    label_resized = label.resize((label_width, label_height), Image.LANCZOS)
    
    # Apply perspective warp for cylindrical look
    label_warped = apply_perspective(label_resized, label_width, label_height)
    
    # Add subtle glass reflection overlay
    glass = create_glass_overlay(label_warped)
    label_final = Image.alpha_composite(label_warped, glass)
    
    # Slightly reduce opacity to show glass-through effect (more realistic)
    # Make the label slightly transparent at edges
    alpha = label_final.split()[3]
    alpha = ImageEnhance.Brightness(alpha).enhance(0.92)
    label_final.putalpha(alpha)
    
    # Position: center horizontally on vial, vertically in the middle-upper body area
    label_x = (tw - label_width) // 2
    label_y = int(th * 0.42)  # Position label in middle of vial body
    
    # Composite onto template
    result = template.copy()
    result.paste(label_final, (label_x, label_y), label_final)
    
    # Convert to RGB for PNG output (remove alpha)
    output = Image.new('RGB', result.size, (245, 245, 242))  # Light bg
    output.paste(result, (0, 0), result)
    
    output.save(output_path, 'PNG', quality=95)
    print(f"  ✓ Generated: {os.path.basename(output_path)}")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Template: {TEMPLATE_PATH}")
    print(f"Labels dir: {LABELS_DIR}")
    print(f"Output dir: {OUTPUT_DIR}")
    print(f"Generating {len(LABEL_MAP)} vial images...\n")
    
    for label_num, output_name in LABEL_MAP.items():
        label_path = os.path.join(LABELS_DIR, f"{label_num}.jpg")
        output_path = os.path.join(OUTPUT_DIR, output_name)
        
        if not os.path.exists(label_path):
            print(f"  ✗ Missing label: {label_path}")
            continue
        
        composite_label_on_vial(TEMPLATE_PATH, label_path, output_path)
    
    print(f"\nDone! {len(LABEL_MAP)} images saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
