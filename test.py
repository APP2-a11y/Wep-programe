import folium

# الإحداثيات الجغرافية
latitude = 30.533667267497073
longitude = 31.49788303641695

# إنشاء الخريطة
m = folium.Map(
    location=[latitude, longitude],
    zoom_start=12,
    tiles="OpenStreetMap"  # نوع الخريطة
)

# إضافة علامة للموقع
folium.Marker(
    location=[latitude, longitude],
    popup="<b>الموقع المحدد</b>",  # نص يظهر عند النقر على العلامة
    tooltip="انقر هنا",  # نص يظهر عند تمرير المؤشر
    icon=folium.Icon(color="red", icon="info-sign")  # لون ونوع العلامة
).add_to(m)

# إضافة دائرة حول الموقع
folium.Circle(
    radius=1000,  # نصف القطر بالمتر
    location=[latitude, longitude],
    color="blue",
    fill=True,
    fill_opacity=0.2
).add_to(m)

# حفظ الخريطة
map_file = "map.html"
m.save(map_file)

print(f"تم حفظ الخريطة في ملف: {map_file}")