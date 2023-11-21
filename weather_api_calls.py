from flask import Flask, request, Response
import jsonpickle
import requests
import json
import pika
import sys

def weathergov(lat, lon):
    # For Statewide alert
    pass

def weatherapi_current(city, data):
    ## api key
    ## current weather info
    api_key = 'REDACTED'
    city_modified = city.replace("%20", " ")
    air_quality = "yes"
    url = f'http://api.weatherapi.com/v1/current.json?key={api_key}&q={city_modified}&aqi={air_quality}'

    response = requests.get(url)

    if response.status_code == 200:
        weather_info = response.json()
        curr_data = {}
        curr_data["region"] = weather_info["location"]["region"]
        curr_data["lat"] = weather_info["location"]["lat"]
        curr_data["lon"] = weather_info["location"]["lon"]
        curr_data["time"] = weather_info["location"]["localtime"]
        curr_data["current_temp"] = weather_info["current"]["temp_c"]
        curr_data["wind_speed"] = weather_info["current"]["wind_kph"]
        curr_data["rain_mm"] = weather_info["current"]["precip_mm"]
        curr_data["feels_like"] = weather_info["current"]["feelslike_c"]
        curr_data["uv"] = weather_info["current"]["uv"]
        curr_data["air_quality_idx"] = weather_info["current"]["air_quality"]["us-epa-index"]
        curr_data["condition"] = weather_info["current"]["condition"]["text"]
        curr_data["icon"] = weather_info["current"]["condition"]["icon"]
        data["current"] = curr_data
    
    return data    

def weatherapi_forecast(city, data):
    num_days = 2
    api_key = "REDACTED"
    air_quality = "yes"
    alert = "yes"
    city_modified = city.replace("%20", " ")
    url = f'http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city_modified}&days={num_days}&aqi={air_quality}&alerts={alert}'

    response = requests.get(url)

    if response.status_code == 200:
        weather_info = response.json()
        ## see weatherapi_response.json for each information
        ## see https://www.weatherapi.com/docs/ and look for weather alerts for alert examples
        
        for i in range(num_days):
            day = str(i)
            data[day] = {}
            data[day]["date"] = weather_info["forecast"]["forecastday"][i]["date"]
            data[day]["maxtemp"] = weather_info["forecast"]["forecastday"][i]["day"]["maxtemp_c"]
            data[day]["mintemp"] = weather_info["forecast"]["forecastday"][i]["day"]["mintemp_c"]
            data[day]["avgtemp"] = weather_info["forecast"]["forecastday"][i]["day"]["avgtemp_c"]  
            data[day]["maxwind"] = weather_info["forecast"]["forecastday"][i]["day"]["maxwind_kph"]  
            data[day]["precip"] = weather_info["forecast"]["forecastday"][i]["day"]["totalprecip_mm"]
            data[day]["snow"] = weather_info["forecast"]["forecastday"][i]["day"]["totalsnow_cm"]
            data[day]["rain_chance"] = weather_info["forecast"]["forecastday"][i]["day"]["daily_chance_of_rain"]
            data[day]["snow_chance"] = weather_info["forecast"]["forecastday"][i]["day"]["daily_chance_of_snow"]
            data[day]["uv"] = weather_info["forecast"]["forecastday"][i]["day"]["uv"]
            data[day]["air_quality_today"] = weather_info["forecast"]["forecastday"][i]["day"]["air_quality"]["us-epa-index"]
            data[day]["condition"] = weather_info["forecast"]["forecastday"][i]["day"]["condition"]["text"]
            data[day]["icon"] = weather_info["forecast"]["forecastday"][i]["day"]["condition"]["icon"]
            data[day]["sunrise"] = weather_info["forecast"]["forecastday"][i]["astro"]["sunrise"]
            data[day]["sunset"] = weather_info["forecast"]["forecastday"][i]["astro"]["sunset"]
            
            for j in range(24):
                hour = str(j)
                data[day][hour] = {}
                data[day][hour]["time"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["time"]
                data[day][hour]["temp_c"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["temp_c"]
                data[day][hour]["wind_kph"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["wind_kph"]
                data[day][hour]["precip_mm"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["precip_mm"]
                data[day][hour]["feelslike_c"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["feelslike_c"]
                data[day][hour]["chance_of_rain"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["chance_of_rain"]
                data[day][hour]["chance_of_snow"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["chance_of_snow"]
                data[day][hour]["uv"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["uv"]
                data[day][hour]["air_quality"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["air_quality"]["us-epa-index"]
                data[day][hour]["condition"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["condition"]["text"]
                data[day][hour]["icon"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["condition"]["icon"]        

    return data    


def visualcrossing_current(city):
    ## see https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/ for alert examples
    ## alert will have fields: event, description. Which should be both sufficient for us
    city_modified = city.replace(" ", "%20")
    api_key = "BDN9BJZGBGF4PB8HYD7AHPB9X"
    url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{city_modified}?unitGroup=metric&key={api_key}&contentType=json'

    response = requests.get(url)

    if response.status_code == 200:
        weather_info = response.json()

def geocode(city):
    api_key = "YsgJ1wNMOXQor7PILzT2UA==HbvC5yXP6WS1S9tW"

    url = f'https://api.api-ninjas.com/v1/city?name={city}'

    response = requests.get(url, headers={'X-Api-Key': api_key})

    if response.status_code == 200:
        city_info = response.json()
        print(city_info[0]["latitude"])
        print(city_info[0]["longitude"])

def reverse_geocode(latitude, longitude):
    api_key = "key"
    url = f"https://api.radar.io/v1/geocode/reverse"
    coordinates = str(latitude) + "," + str(longitude)
    headers = {"Authorization": f"{api_key}"}
    params = {"coordinates": coordinates}

    response = requests.get(url, headers = headers, params = params)
    print(response.status_code)
    if response.status_code == 200:
        data = response.json()
        print(data["addresses"][0]['county'])
        print(data["addresses"][0]['city'])
        print(data["addresses"][0]['neighborhood'])

# Initialize the Flask application
app = Flask(__name__)


@app.route('/weatherbycity/<cityName>', methods=['GET'])
def getWeatherByCity(cityName):
    data = {}
    # Call weatherapi.com
    data = weatherapi_current(cityName, data)

    data = weatherapi_forecast(cityName, data)

    #print(data) # Test the output
    converted_data = json.dumps(data)
    user_id = "1" # TODO: Change this to database retrieval later
    channel.basic_publish(exchange='direct_logs', routing_key=user_id, body=converted_data)
    #print(" [x] Sent %r:%r" % (user_id, converted_data))
    
    response_pickled = jsonpickle.encode(data)
    return Response(response=response_pickled, status=200, mimetype="application/json")

    # Call visualcrossing.com
    visualcrossing_current(cityName)

    # finds the latitude and longitude
    geocode(cityName)



@app.route('/weatherbycoordinates/<float:latitude>,<float:longitude>', methods=['GET'])
def getWeatherByCordinates(latitude, longitude):
    # response = {'sum' : str(a + b)}
    # response_pickled = jsonpickle.encode(response)
    # return Response(response=response_pickled, status=200, mimetype="application/json")

    # Call API endpoints


    reverse_geocode(latitude, longitude)




connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='direct_logs', exchange_type='direct')

# start flask app
app.run(host="0.0.0.0", port=5000)