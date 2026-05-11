import cv2
import numpy as np

def cylinder_warp(img, f, camera_dist):
    h, w = img.shape[:2]
    K = np.array([[f, 0, w/2], [0, f, h/2], [0, 0, 1]])
    
    # Create grid
    x, y = np.meshgrid(np.arange(w), np.arange(h))
    x_c = x - w/2
    y_c = y - h/2
    
    # Cylinder mapping
    theta = x_c / f
    x_p = np.sin(theta) * camera_dist
    z_p = np.cos(theta) * camera_dist
    
    x_img = (x_p * f / z_p) + w/2
    y_img = (y_c * camera_dist / z_p) + h/2
    
    map_x = x_img.astype(np.float32)
    map_y = y_img.astype(np.float32)
    
    warped = cv2.remap(img, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))
    return warped

label_path = "/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/public/images/labels/1.jpg"
label = cv2.imread(label_path, cv2.IMREAD_UNCHANGED)

# Add alpha channel if not present
if label.shape[2] == 3:
    label = cv2.cvtColor(label, cv2.COLOR_BGR2BGRA)

# Warp
warped = cylinder_warp(label, f=600, camera_dist=600)
cv2.imwrite("/Users/tonymac/.gemini/antigravity/scratch/peptides-and-you/scripts/warped_test.png", warped)
print("Saved warped test")
