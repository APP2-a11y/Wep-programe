import folium

# الإحداثيات الجغرافية المحدثة
latitude = 30.533352
longitude = 31.492982

# إنشاء الخريطة مع إعدادات محسنة
m = folium.Map(
    location=[latitude, longitude],
    zoom_start=15,  # زيادة مستوى التكبير
    tiles="OpenStreetMap",  # نوع الخريطة
    control_scale=True  # إضافة مقياس الرسم
)

# نص متطور لعرض الإحداثيات
coordinates_html = f"""
<div style="font-family: Arial; font-size: 14px; width: 250px">
    <h4 style="color: #d63384; margin: 0 0 5px 0">الموقع الدقيق</h4>
    <div style="background: #f8f9fa; padding: 8px; border-radius: 5px">
        <b style="color: #0d6efd">الإحداثيات:</b><br>
        <span style="color: #333">• خط العرض:</span> {latitude:.6f}°<br>
        <span style="color: #333">• خط الطول:</span> {longitude:.6f}°<br>
        <hr style="margin: 5px 0; border-color: #eee">
        <i style="font-size: 12px">نظام WGS84 - دقة عالية</i>
    </div>
</div>
"""

# إضافة علامة محسنة
folium.Marker(
    location=[latitude, longitude],
    popup=folium.Popup(coordinates_html, max_width=300),
    tooltip="انقر لعرض التفاصيل",
    icon=folium.Icon(
        color="red",
        icon="map-marker",
        prefix="fa",
        icon_color="white"
    )
).add_to(m)

# إضافة دائرة دقة (500 متر)
folium.Circle(
    radius=500,
    location=[latitude, longitude],
    color="#3186cc",
    fill=True,
    fill_opacity=0.2,
    weight=2,
    stroke=True
).add_to(m)

# إضافة إمكانية رؤية إحداثيات أي نقطة
m.add_child(folium.LatLngPopup())

# حفظ الخريطة
map_file = "precise_location_map.html"
m.save(map_file)

# طباعة تقرير مفصل
print(f"""
تم إنشاء الخريطة بنجاح 🗺️
---------------------------------
• الإحداثيات المحددة:
  - خط العرض: {latitude:.8f}°
  - خط الطول: {longitude:.8f}°
• مستوى التكبير: 15
• نصف قطر الدائرة: 500 متر
• تم حفظ الخريطة في: {map_file}
""")