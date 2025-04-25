import requests
import folium
import webbrowser
from geocoder import ip

def get_ip_location(ip_address=None):
    """الحصول على معلومات الموقع من عنوان IP"""
    try:
        if ip_address:
            g = ip(ip_address)
        else:
            g = ip('me')  # الحصول على موقع الجهاز الحالي
        
        if g.ok:
            return {
                'ip': g.ip,
                'city': g.city,
                'country': g.country,
                'latitude': g.lat,
                'longitude': g.lng
            }
        else:
            return None
    except Exception as e:
        print(f"حدث خطأ: {e}")
        return None

def show_on_map(latitude, longitude, ip_address):
    """عرض الموقع على الخريطة"""
    try:
        # إنشاء خريطة مركزة على الموقع
        m = folium.Map(location=[latitude, longitude], zoom_start=12)
        
        # إضافة علامة للموقع
        folium.Marker(
            [latitude, longitude],
            popup=f"IP: {ip_address}",
            tooltip="انقر لعرض التفاصيل"
        ).add_to(m)
        
        # حفظ الخريطة في ملف HTML
        map_file = "ip_location_map.html"
        m.save(map_file)
        
        # فتح الخريطة في المتصفح الافتراضي
        webbrowser.open(map_file)
        return True
    except Exception as e:
        print(f"حدث خطأ في إنشاء الخريطة: {e}")
        return False

def main():
    print("═══ أداة تحديد الموقع على الخريطة من IP ═══")
    user_ip = input("أدخل عنوان IP (أو اضغط Enter لموقعك الحالي): ").strip()
    
    location = get_ip_location(user_ip if user_ip else None)
    
    if location:
        print("\n╔════════════════════════════╗")
        print("║        معلومات الموقع      ║")
        print("╚════════════════════════════╝")
        print(f"IP: {location['ip']}")
        print(f"المدينة: {location['city']}")
        print(f"الدولة: {location['country']}")
        print(f"الإحداثيات: {location['latitude']}, {location['longitude']}")
        
        if show_on_map(location['latitude'], location['longitude'], location['ip']):
            print("\nتم فتح الخريطة في متصفح الويب.")
        else:
            print("\nفشل في عرض الخريطة.")
    else:
        print("\nلا يمكن تحديد الموقع لـ IP المحدد.")

if __name__ == "__main__":
    main()