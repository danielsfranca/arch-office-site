import os
from PIL import Image

public_dir = r"e:\SERVIDOR\arch-office-site\public"

def optimize():
    count = 0
    for root, dirs, files in os.walk(public_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                input_path = os.path.join(root, file)
                output_path = os.path.splitext(input_path)[0] + ".webp"
                
                try:
                    with Image.open(input_path) as img:
                        # Determine target width
                        width, height = img.size
                        target_width = 1200 # Default for content
                        
                        # Banner detection: specific keywords or root directory
                        is_banner = False
                        if any(k in file.lower() for k in ["main", "cover", "vista", "render", "hero", "header", "banner", "_1", "_2"]):
                            is_banner = True
                        if root == public_dir and width > 1000: # Root images that look big
                            is_banner = True
                            
                        if is_banner:
                            target_width = 1920
                        
                        # Small/Logo detection: avoid upscaling
                        if any(k in file.lower() for k in ["logo", "icon", "dot", "square", "signature", "client", "text"]):
                             target_width = min(width, 800)
                        
                        # Resize if larger than target
                        if width > target_width:
                            ratio = target_width / float(width)
                            target_height = int(float(height) * ratio)
                            img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
                        
                        # Save as WebP
                        img.save(output_path, "WEBP", quality=85, method=6)
                        count += 1
                        print(f"Optimized [{count}]: {os.path.relpath(input_path, public_dir)} -> WebP")
                except Exception as e:
                    print(f"Error processing {file}: {e}")
    print(f"\nFinished! {count} images converted to WebP.")

if __name__ == "__main__":
    optimize()
