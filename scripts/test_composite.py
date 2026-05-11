import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import os

template_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/generic_vial_template.png"
label_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/images/labels/1.jpg"

base_img = Image.open(template_path).convert("RGBA")
label_img = Image.open(label_path).convert("RGBA")

# Target dimensions for the label on the vial
# The glass body is from x=290 to 725. We want the label to wrap around, so it shouldn't hit the absolute edges.
target_w = 410
target_h = 190

label_img = label_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Create a mask for the label to simulate cylinder curve (rounded corners, alpha falloff on sides)
mask = Image.new("L", (target_w, target_h), 255)
draw = ImageDraw.Draw(mask)

# Create a shadow map (black with alpha gradient) to overlay on the label
shadow_overlay = Image.new("RGBA", (target_w, target_h), (0,0,0,0))
shadow_draw = ImageDraw.Draw(shadow_overlay)
for x in range(target_w):
    # Calculate shadow intensity based on distance from center
    dist_from_center = abs(x - target_w/2) / (target_w/2)
    # Intense shadow on edges (pow 3)
    alpha = int(255 * (dist_from_center ** 2.5))
    shadow_draw.line([(x, 0), (x, target_h)], fill=(0, 0, 0, alpha))

# Create a highlight glare (white streak)
glare_overlay = Image.new("RGBA", (target_w, target_h), (0,0,0,0))
glare_draw = ImageDraw.Draw(glare_overlay)
# Glare at x = target_w * 0.25
glare_center = int(target_w * 0.3)
glare_width = 40
for x in range(glare_center - glare_width, glare_center + glare_width):
    dist = abs(x - glare_center) / glare_width
    alpha = int(100 * (1 - dist)) # Max opacity 100
    glare_draw.line([(x, 0), (x, target_h)], fill=(255, 255, 255, alpha))

# Composite the label
composite_label = Image.alpha_composite(label_img, shadow_overlay)
composite_label = Image.alpha_composite(composite_label, glare_overlay)

# Make the label itself slightly transparent so the glass texture behind it shows through
composite_label.putalpha(245)

# Calculate paste position
# Center is 512.
x_offset = 512 - (target_w // 2)
y_offset = 430

# Paste
result = base_img.copy()
result.paste(composite_label, (x_offset, y_offset), composite_label)

result.save("/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/test_composite.png")
print("Saved test_composite.png")
