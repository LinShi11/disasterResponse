from flask import Flask, request, Response
import jsonpickle
import requests


def openweathermap(lat, lon):
    # Current weather
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3990225d53165b03ae24613d8e5b8099'
    response = requests.get(url)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        weather_info = response.json()
        temp_min = weather_info["main"]["temp_min"]
        temp_max = weather_info["main"]["temp_max"]
        temp_feels_like = weather_info["main"]["feels_like"]
        wind_speed = weather_info["wind"]["speed"]
        snowfall = weather_info["snow"]["snow.1h"]
        rainfall = weather_info["rain"]["rain.1h"]
        #uv_index = weather_info
        visibility = weather_info["visibility"]
        sunrise = weather_info["sys"]["sys.sunrise"]
        sunset = weather_info["sys"]["sys.sunset"]
        #alerts = weather_info
        air_quality_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=3990225d53165b03ae24613d8e5b8099'
        air_quality = air_quality_url["list"][0]["main"]["aqi"]
   
    # Forecast
    # Hourly forecast available here - have to aggregate 24hrs for a single day. Doesn't sound efficient


def weathergov(lat, lon):
    # Current weather
    # Not available
   
    # Forecast
    # 12hr forecast available
    url = f'https://api.weather.gov/points/{lat},{lon}'
    response = requests.get(url)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        forecast_url = response["properties"]["forecast"]
        forecast_response = requests.get(forecast_url)
        if forecast_response.status_code == 200:

            weather_info = response.json()
            # weather_info["properties"]["periods"]
            # temp_min = weather_info
            # temp_max = weather_info
            # temp_feels_like = weather_info
            # wind_speed = weather_info
            # snowfall = weather_info
            # rainfall = weather_info
            # uv_index = weather_info
            # visibility = weather_info
            # sunrise = weather_info
            # sunset = weather_info
            # alerts = weather_info
            # air_quality = weather_info
    





# Initialize the Flask application
app = Flask(__name__)

@app.route('/weatherbycity/<cityName>', methods=['GET'])
def getWeatherByCity(cityName):    
    # Call weatherapi.com   

    # Call visualcrossing.com
    pass


@app.route('/weatherbycoordinates/<float:latitude>,<float:longitude>', methods=['GET'])
def getWeatherByCordinates(latitude, longitude):
    # response = {'sum' : str(a + b)}
    # response_pickled = jsonpickle.encode(response)
    # return Response(response=response_pickled, status=200, mimetype="application/json")
    
    # Call API endpoints   
    openweathermap(latitude, longitude)
    weathergov(latitude, longitude)







# start flask app
app.run(host="0.0.0.0", port=5000)
