import os

public_dir = r"e:\SERVIDOR\arch-office-site\public"

def cleanup():
    count = 0
    for root, dirs, files in os.walk(public_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                png_path = os.path.join(root, file)
                webp_path = os.path.splitext(png_path)[0] + ".webp"
                
                if os.path.exists(webp_path):
                    try:
                        os.remove(png_path)
                        count += 1
                        # print(f"Removed: {os.path.relpath(png_path, public_dir)}")
                    except Exception as e:
                        print(f"Error removing {file}: {e}")
                else:
                    print(f"Skipping (no WebP equivalent): {file}")
    
    print(f"\nCleanup finished! Removed {count} original image files.")

if __name__ == "__main__":
    cleanup()
