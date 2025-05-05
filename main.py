import os
import wget

url = ""
os.makedirs("website", exist_ok=True)

wget.download(url, out="website/index.html")

print("\n? تم تحميل الصفحة بالكامل!")
