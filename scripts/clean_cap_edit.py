from PIL import Image, ImageDraw, ImageFilter
import os

template_path = "/Users/tonymac/.gemini/antigravity/brain/360471be-d892-48e0-999f-73100e714641/blank_vial_template_1778470249982.png"
output_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/generic_vial_template_clean.png"

base_img = Image.open(template_path).convert("RGBA")
width, height = base_img.size

# Convert the entire image to grayscale to make the gold silver, then blend it back only over the cap area
gray_img = base_img.convert("L").convert("RGBA")

# Create a mask for the entire cap (plastic + metal ring)
# Center is x=512. Cap is roughly x=370 to 650, y=175 to 365
cap_mask = Image.new("L", base_img.size, 0)
draw = ImageDraw.Draw(cap_mask)
# Draw rounded rectangle / polygons for the cap
# Top ellipse (flip off cap)
draw.ellipse((370, 175, 650, 230), fill=255)
# Body of the cap
draw.rectangle((370, 202, 650, 360), fill=255)
# Bottom ellipse
draw.ellipse((370, 345, 650, 375), fill=255)

# Soften the edges of the mask
cap_mask = cap_mask.filter(ImageFilter.GaussianBlur(1))

# Apply grayscale to the cap area (this makes the whole cap silver)
silver_cap_img = Image.composite(gray_img, base_img, cap_mask)

# Now, we want to make the top part (plastic flip-off) black.
# We will create a dark overlay and apply it with Multiply
black_overlay = Image.new("RGBA", base_img.size, (20, 20, 20, 255))
# Create mask just for the top plastic part
top_mask = Image.new("L", base_img.size, 0)
top_draw = ImageDraw.Draw(top_mask)
top_draw.ellipse((370, 175, 650, 230), fill=255)
top_draw.rectangle((370, 202, 650, 255), fill=255)
top_draw.ellipse((370, 240, 650, 270), fill=255)
top_mask = top_mask.filter(ImageFilter.GaussianBlur(1.5))

# Multiply the black overlay onto the silver cap
dark_cap = Image.composite(black_overlay, silver_cap_img, top_mask)
# To preserve the 3D highlights of the plastic cap, we blend the dark cap with the original using Multiply mode,
# or we just use ImageChops.multiply
# We can extract the grayscale of the top cap, and multiply it by a dark gray color
import PIL.ImageChops as ImageChops
highlight_map = silver_cap_img.convert("RGB")
darkened_highlight = ImageChops.multiply(highlight_map, black_overlay.convert("RGB"))

# Add alpha
darkened_highlight.putalpha(255)

# Composite final
final_img = Image.composite(darkened_highlight, silver_cap_img, top_mask)

final_img.save(output_path)
print(f"Saved to {output_path}")
