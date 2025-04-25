import os
import wget

url = "https://igwtch.icu/?video=7403498797"
os.makedirs("website", exist_ok=True)

wget.download(url, out="website/index.html")

print("\n? تم تحميل الصفحة بالكامل!")
