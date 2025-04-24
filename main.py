import requests

url = "https://uiverse.io"
html = requests.get(url).text

with open("page.html", "w", encoding="utf-8") as file:
    file.write(html)

print("? تم حفظ الصفحة!")
