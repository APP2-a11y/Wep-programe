import requests
from bs4 import BeautifulSoup

url = "https://jokersaid.surge.sh/index2.html"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

css_links = [link.get("href") for link in soup.find_all("link", rel="stylesheet")]

for i, css_link in enumerate(css_links):
    if css_link.startswith("http"):
        css_data = requests.get(css_link).text
        with open(f"style_{i+1}.css", "w", encoding="utf-8") as file:
            file.write(css_data)

print("? تم تحميل وحفظ جميع ملفات CSS!")
