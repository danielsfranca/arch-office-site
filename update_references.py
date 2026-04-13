import os
import re

src_dir = r"e:\SERVIDOR\arch-office-site\src"

def update_refs():
    count = 0
    # Pattern to match image extensions in strings
    pattern = re.compile(r'\.(png|jpg|jpeg)', re.IGNORECASE)
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.lower().endswith(('.tsx', '.ts', '.css', '.js')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub('.webp', content)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        count += 1
                        print(f"Updated references in: {os.path.relpath(file_path, src_dir)}")
                except Exception as e:
                    print(f"Error updating {file}: {e}")
    
    # Also update constants/mock data inside the file if they are hardcoded
    print(f"\nFinished! Updated references in {count} files.")

if __name__ == "__main__":
    update_refs()
