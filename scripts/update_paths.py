import re

file_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/src/data/peptides.js"
with open(file_path, "r") as f:
    content = f.read()

replacements = {
    "1.jpg": "bpc-157-5mg.png",
    "2.jpg": "bpc-157-10mg.png",
    "3.jpg": "tb-500-2mg.png",
    "4.jpg": "tb-500-5mg.png",
    "5.jpg": "ghk-cu-50mg.png",
    "6.jpg": "ghk-cu-100mg.png",
    "7.jpg": "retatrutide-5mg.png",
    "8.jpg": "retatrutide-10mg.png",
    "9.jpg": "retatrutide-15mg.png",
    "10.jpg": "wolverine-stack-10mg.png",
    "11.jpg": "wolverine-stack-20mg.png",
    "12.jpg": "epithalon-10mg.png",
    "13.jpg": "aod9604-5mg.png",
    "14.jpg": "selank-5mg.png",
    "15.jpg": "cjc-1295-2mg-dac.png",
    "16.jpg": "cjc-1295-5mg-dac.png",
    "17.jpg": "cjc-1295-2mg-nodac.png",
    "18.jpg": "ipamorelin-2mg.png",
    "19.jpg": "ipamorelin-5mg.png",
    "20.jpg": "hgh-10iu.png",
    "21.jpg": "hgh-15iu.png",
    "22.jpg": "hgh-20iu.png",
}

for old, new in replacements.items():
    content = content.replace(f"'/images/labels/{old}'", f"'/products/generated/{new}'")

with open(file_path, "w") as f:
    f.write(content)
print("Updated peptides.js")
