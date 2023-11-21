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


def weatherapi_forcast(city):
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

def geocode(city):
    api_key = "key"
    address = "1242 Lewis ave billings mt"
    url = f'https://api.radar.io/v1/geocode/forward'
    query_params = {"query": f"{address}"}
    headers = {"Authorization": f"{api_key}"}

    response = requests.get(url, headers = headers, params = query_params)

    if response.status_code == 200:
        data = response.json()
        latitude = data['addresses'][0]['latitude']
        longitude = data['addresses'][0]['longitude']


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

    # Call weatherapi.com
    weatherapi_forcast(cityName)
    # finds the latitude and longitude
    geocode(cityName)



@app.route('/weatherbycoordinates/<float:latitude>,<float:longitude>', methods=['GET'])
def getWeatherByCordinates(latitude, longitude):
    # response = {'sum' : str(a + b)}
    # response_pickled = jsonpickle.encode(response)
    # return Response(response=response_pickled, status=200, mimetype="application/json")

    # Call API endpoints
    openweathermap(latitude, longitude)
    weathergov(latitude, longitude)

    reverse_geocode(latitude, longitude)






# start flask app
app.run(host="0.0.0.0", port=5000)
