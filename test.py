import phonenumbers
from phonenumbers import geocoder, carrier
import folium
import webbrowser
from geopy.geocoders import Nominatim

def get_phone_info_with_map(phone_number):
    try:
        # Parse phone number
        parsed_num = phonenumbers.parse(phone_number, None)
        
        # Get country and region
        country = geocoder.country_name_for_number(parsed_num, "en")
        region = geocoder.description_for_number(parsed_num, "en")
        carrier_name = carrier.name_for_number(parsed_num, "en")
        
        # Get approximate coordinates using region name
        geolocator = Nominatim(user_agent="phone_locator")
        location = geolocator.geocode(f"{region}, {country}")
        
        if not location:
            return {"Error": "Could not determine location coordinates"}
        
        # Create map
        m = folium.Map(location=[location.latitude, location.longitude], zoom_start=10)
        
        # Add marker
        folium.Marker(
            [location.latitude, location.longitude],
            popup=f"""
            <b>Phone Info:</b><br>
            Country: {country}<br>
            Region: {region}<br>
            Carrier: {carrier_name}<br>
            Coordinates: {location.latitude:.4f}, {location.longitude:.4f}
            """,
            tooltip="Click for details"
        ).add_to(m)
        
        # Save and open map
        map_file = f"phone_location_{phone_number}.html"
        m.save(map_file)
        webbrowser.open(map_file)
        
        return {
            "Country": country,
            "Region": region,
            "Carrier": carrier_name,
            "Coordinates": (location.latitude, location.longitude),
            "Map": f"Saved to {map_file}"
        }
        
    except Exception as e:
        return {"Error": f"An error occurred: {str(e)}"}

# Example usage:
result = get_phone_info_with_map("+201008919921")  # Egypt - Vodafone
print(result)