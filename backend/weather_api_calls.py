from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import jsonpickle
import requests
import random
import pika
import sys
import json
from pymongo import MongoClient

import bcrypt

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

db = client.disasterResponse

usersTable = {
    'regular': db.users, 
    'authority': db.authorities, 
    'rescue team': db.rescue
}


def weatherapi_current(city, data):
    ## api key
    ## current weather info
    api_key = 'key'
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
        # curr_data["air_quality_idx"] = weather_info["current"]["air_quality"]["us-epa-index"]
        curr_data["condition"] = weather_info["current"]["condition"]["text"]
        curr_data["icon"] = weather_info["current"]["condition"]["icon"]
        data["current"] = curr_data

    return data

def weatherapi_forecast(city, data):
    num_days = 2
    api_key = "key"
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
            # data[day]["air_quality_today"] = weather_info['forecast']['forecastday'][i]['day']['air_quality']["us-epa-index"]
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
                # data[day][hour]["air_quality"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["air_quality"]["us-epa-index"]
                data[day][hour]["condition"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["condition"]["text"]
                data[day][hour]["icon"] = weather_info["forecast"]["forecastday"][i]["hour"][j]["condition"]["icon"]

        all_alerts = []
        for element in weather_info['alerts']['alert']:
            alert = {}
            for key, value in element.items():
                alert[key] = value
            all_alerts.append(alert)
        data["alerts"] = all_alerts
        print(data)
    return data

def weathergov(state):

    # Note: all states must be in abbreviation
    state = "CO"
    url = f'https://api.weather.gov/alerts/active?area={state}'
    response = requests.get(url)
    state_alert = []
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        weather_info = response.json()
        for element in weather_info['features']:
            alert = {}
            for key, value in element['properties'].items():
                alert[key] = value
            state_alert.append(alert)
    print(len(state_alert))
    return state_alert


def geocode(city):
    # Finding: not that sensitive. Will give the city location at the very least
    api_key = "key"
    address = ""
    url = f'https://api.radar.io/v1/geocode/forward'
    query_params = {"query": f"{address}"}
    headers = {"Authorization": f"{api_key}"}

    response = requests.get(url, headers = headers, params = query_params)

    if response.status_code == 200:
        data = response.json()
        print(data)
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
CORS(app)

usersTable = db.users
users_uname = usersTable.find({},{"username":1})


@app.route('/home', methods=['GET'])
def home():
    return jsonify("Hello World")

@app.route('/weatherbycity/<cityName>', methods=['GET'])
def getWeatherByCity(cityName):
    data = {}
    # Call weatherapi.com
    data = weatherapi_current(cityName, data)

    data = weatherapi_forecast(cityName, data)
    return data



@app.route('/weatherAlert/<state>', methods=['GET'])
def getStateAlert(state):
    data = {}
    # TODO: change cityName to the proper state
    data = weathergov(state)

    return data


@app.route('/login', methods=['POST'])
def login():
    global usersTable

    data = request.get_json()
    uname = data.get('username')
    pwd = data.get('password')
    user_type = data.get("userType")
    
    if(user_type == "authority"):
        usersTable = db.authorities
    elif (user_type == "rescue team"):
        usersTable = db.rescue
    user_document = usersTable.find_one({"username": uname})
    if user_document:
        hashed_password = user_document.get('password')

        if bcrypt.checkpw(pwd.encode('utf-8'), hashed_password):
            # user = User()
            # user.id = uname
            # flask_login.login_user(user)
            return jsonify({"message": "Login successful"})

    # Authentication failed
    return jsonify({"message": "Invalid credentials"}), 401


def send_signup_message_to_rabbitmq(user_data):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-service', 5672))
    channel = connection.channel()

    channel.queue_declare(queue='sign_up_queue', durable=True)
    # print(user_data)
    try:
        json_data = json.dumps(user_data)
    except Exception as e:
        print(e)
        
    
    # print("Type of user_data:", type(user_data))
    # print("Type of json_data:", type(json_data))
    # print("Serialized user_data:", json_data)
    print("Sending signup message to RabbitMQ")
    # user_data = "helloworld"
    channel.basic_publish(exchange='',
                          routing_key='sign_up_queue',
                          body=json.dumps(user_data),
                          properties=pika.BasicProperties(
        delivery_mode=2,  # make message persistent
    ))
    print("Sent signup message to RabbitMQ")
    connection.close()

@app.route('/signup', methods=['POST'])
def signup():
    # TODO: make sure username is unqiue
    try:
        data = request.get_json()
        nm = data.get("name")
        fname = nm.get("first")
        lname = nm.get("last")
        uname = data.get("username")
        pwd = data.get("password")
        addr = data.get("address")
        door = addr.get("door")
        street = addr.get("street")
        apt = addr.get("apt")
        city = addr.get("city")
        state = addr.get("state")
        zipcode = addr.get("zip")
        phone = data.get("phone")
        email = data.get("email")
        preference = data.get("preference")
        contact = preference.get("contact")
        alerts = preference.get("alerts")

        userDocument = {
        "name": { "first": fname, "last": lname },
        "username": uname,
        "password": pwd,
        "address": { "door": door, "street name": street, "apt": apt, "city": city, "state": state, "zip": int(zipcode) },
        "phone": int(phone),
        "email": email,
        "preference": { "contact": contact, "alerts": alerts }
        }
        print(userDocument)
        send_signup_message_to_rabbitmq(userDocument)
        return jsonify({"message": "Signup successful"})
    except:
        return jsonify({"message": "Signup failed"}), 401


# TODO: Duplicate the login and signup endpoints for authorities and rescue teams once the code is tested



@app.route('/logout')
def logout():
    return flask.redirect(flask.url_for('login'))

@app.route('/getUserCity', methods=['POST'])
def getCity():
    data = request.get_json()
    uname = data.get('username')
    user_type = data.get('userType')
    
    user_document = usersTable.find_one({"username": uname}) 
    city = "Not Found"
    if user_document:
        if(user_type == "authority"):
            city = user_document.get('city')
        elif(user_type == "rescue team"):
            city = user_document.get('city')
        elif(user_type == "regular"):
            address = user_document.get('address')
            city = address.get('city')
        return jsonify({"city": city})
    else:
        return jsonify({"city": "Not Found"})

def send_db_updations_to_rabbitmq(data):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-service', 5672))
    channel = connection.channel()

    channel.queue_declare(queue='updations_queue', durable=True)

    print("Sending updation message to RabbitMQ")

    channel.basic_publish(exchange='',
                          routing_key='updations_queue',
                          body=json.dumps(data),
                          properties=pika.BasicProperties(
        delivery_mode=2,  # make message persistent
    ))
    print("Sent updation message to RabbitMQ")
    connection.close()



@app.route('/updateUserInfo', methods=['POST'])
def userInfo():
    if request.method == 'POST':
        data = request.get_json()

        send_db_updations_to_rabbitmq(data)
        return jsonify({"message": "Update successful"})



@app.route('/getUserInfo', methods=['POST'])
def getUserInfo():
    data = request.get_json()
    uname = data.get('username')
    user_document = usersTable.find_one({"username": uname}, {"_id": 0, "password": 0})

    print(user_document)
    if user_document:
        return jsonify(user_document)


def send_alert_insertions_to_rabbitmq(data):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-service', 5672))
    channel = connection.channel()

    channel.queue_declare(queue='alert_insertions', durable=True)
    
    print("Sending insertion message to RabbitMQ")

    channel.basic_publish(exchange='',
                          routing_key='alert_insertions',
                          body=json.dumps(data),
                          properties=pika.BasicProperties(
        delivery_mode=2,  # make message persistent
    ))
    print("Sent updation message to RabbitMQ")
    connection.close()


@app.route('/SendAlert', methods=['POST'])
def sendAlert():
    print("In send alert function")
    data = request.get_json()  # get city, auth_username
    auth_uname = data.get('username')
    city = data.get('city')
    random_alert_id = random.randint(10000000, 99999999) # Create a random alert id 
    print(random_alert_id)
    authoritiesTable = db.authorities
    
    # update the authorities table with this latest alert id
    authoritiesTable.update_one({'username': auth_uname}, {'$set': {'latestAlert': random_alert_id}})

    usersTable = db.users
    users_matching_city_and_preference = usersTable.find({"address.city": city, "preference.contact": True}, {"username": 1})

    for user in users_matching_city_and_preference:
        send_data = {"userid": user['username'], "alertid": random_alert_id, "authid": auth_uname, "helpNeeded": '1'}
        send_alert_insertions_to_rabbitmq(send_data)
    return jsonify({"message": "Alert sent"})

    

def send_checkin_updations_to_rabbitmq(data):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-service', 5672))
    channel = connection.channel()

    channel.queue_declare(queue='checkin_updations', durable=True)
    
    print("Sending checkin updation message to RabbitMQ")

    channel.basic_publish(exchange='',
                          routing_key='checkin_updations',
                          body=json.dumps(data),
                          properties=pika.BasicProperties(
        delivery_mode=2,  # make message persistent
    ))
    print("Sent checkin updation message to RabbitMQ")
    connection.close()


@app.route('/disasterCheckin', methods=['POST'])
def disasterCheckin():
    data = request.get_json()
    uname = data.get('username')
    checkin = data.get('message')
    alertid = int(data.get("alertid"))

    disasterTable = db.disasterCheckin
    
    #Add to DB
    if checkin == "0":
        disasterTable.update_one({"userid": uname, "alertid": alertid}, {'$set': {'helpNeeded': "0"}})
        return jsonify({"message": "Thank you for letting us know. Please reach out if you have any issues."})
    else:
    #Add to DB based on username and ---
        return jsonify({"message": "Thanks for checking in. We'll make sure you receive help!"})


def send_task_insertions_to_rabbitmq(data):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-service', 5672))
    channel = connection.channel()

    channel.queue_declare(queue='task_insertions', durable=True)
    
    print("Sending insertion message to RabbitMQ")

    channel.basic_publish(exchange='',
                          routing_key='task_insertions',
                          body=json.dumps(data),
                          properties=pika.BasicProperties(
        delivery_mode=2,  # make message persistent
    ))
    print("Sent updation message to RabbitMQ")
    connection.close()

@app.route('/sendTask', methods=['POST'])
def sendTask():
    data = request.get_json()  # get city, auth_username
    auth_uname = data.get('username')
    message = data.get("message")
    # city = data.get('city')
    random_task_id = random.randint(10000000, 99999999) # Create a random alert id 
    print(random_task_id)
    rescueTeam = db.rescue
    
    # update the authorities table with this latest alert id
    rescueTeam.update_one({'username': auth_uname}, {'$set': {'task': random_task_id, "availability": "1", "message": message}})
    send_data = {'username': auth_uname, 'task': random_task_id, "message": message}
    send_task_insertions_to_rabbitmq(send_data)
    return jsonify({"message": "Task sent"})

@app.route('/taskCheckin', methods=['POST'])
def taskCheckin():
    data = request.get_json()
    uname = data.get('username')
    # checkin = data.get('message')
    taskId = data.get("task")
    # print(checkin)

    rescueTeamTable = db.rescue
    
    #Add to DB
    
    rescueTeamTable.update_one({"username": uname}, {'$set': {'availability': "0", "task": "0", "message": ""}})
    return jsonify({"message": "Thank you for letting us know. We will reach out with another task"})



# start flask app
app.run(host="0.0.0.0", port=5000)
