from PIL import Image
import os

template_path = "/Users/tonymac/.gemini/antigravity/brain/360471be-d892-48e0-999f-73100e714641/blank_vial_template_1778470249982.png"
output_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/generic_vial_template.png"

def rgb_to_hsv(r, g, b):
    maxc = max(r, g, b)
    minc = min(r, g, b)
    v = maxc
    if minc == maxc:
        return 0.0, 0.0, v
    s = (maxc-minc) / maxc
    rc = (maxc-r) / (maxc-minc)
    gc = (maxc-g) / (maxc-minc)
    bc = (maxc-b) / (maxc-minc)
    if r == maxc:
        h = bc-gc
    elif g == maxc:
        h = 2.0+rc-bc
    else:
        h = 4.0+gc-rc
    h = (h/6.0) % 1.0
    return h, s, v

img = Image.open(template_path).convert('RGBA')
pixels = img.load()
width, height = img.size

cap_top = 175
cap_bottom = 350
cap_left = 360
cap_right = 660
cap_split = 265 

for y in range(cap_top, cap_bottom):
    for x in range(cap_left, cap_right):
        r, g, b, a = pixels[x, y]
        if a < 10: continue
            
        h, s, v = rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        
        # Gold has a noticeable hue and saturation, and is distinctly yellow/orange (h ~ 0.05 to 0.2)
        # Background is neutral (s < 0.1). Also account for dark shadows which might have low sat.
        is_background = s < 0.08 and v > 0.8 # Light grey background
        is_neutral = s < 0.05
        
        # We want to tint the cap parts.
        # The top cap might have very bright reflections (high v, low s).
        # We can be more aggressive by checking if it's NOT the background gradient.
        # Background gradient is around (240,240,240) to (220,220,220).
        if r > 200 and abs(r-g) < 10 and abs(g-b) < 10:
            continue # Skip background
            
        # To avoid the edges showing artifacts, we also skip pixels that are too light and neutral
        if s < 0.05 and v > 0.8:
            continue
            
        # Below the cap there is also a gold neck ring around y=350-360.
        # Let's just process based on y coordinate
        if y < cap_split:
            # Plastic cap: make it black
            new_v = v * 0.15
            pixels[x, y] = (int(new_v*255), int(new_v*255), int(new_v*255), a)
        else:
            # Metal ring: make it silver/grey
            pixels[x, y] = (int(v*255), int(v*255), int(v*255), a)

# Also fix the tiny gold ring under the metal cap (y = 350 to 365, x = 400 to 620)
for y in range(340, 370):
    for x in range(400, 620):
        r, g, b, a = pixels[x, y]
        h, s, v = rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        # If it's golden (h between 0.05 and 0.20, s > 0.2)
        if 0.05 < h < 0.20 and s > 0.2:
            # make it silver
            pixels[x, y] = (int(v*255), int(v*255), int(v*255), a)

img.save(output_path)
print(f"Saved refined generic template to {output_path}")
