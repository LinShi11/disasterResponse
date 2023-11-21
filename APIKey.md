#### b
https://openweathermap.org/

3990225d53165b03ae24613d8e5b8099

Usage: https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

#### c
https://www.weatherapi.com/

REDACTED

Usage: http://api.weatherapi.com/v1/current.json?key={api_key_src1}&q={city}

#### d
https://www.weather.gov/

No API key required

Usage: https://api.weather.gov/points/{latitude},{longitude}


#### j geocode
https://api.api-ninjas.com/v1/

api key: YsgJ1wNMOXQor7PILzT2UA==HbvC5yXP6WS1S9tW

https://api.api-ninjas.com/v1/city?name={city}, headers={'X-Api-Key': 'YOUR_API_KEY'}

#### k reverse geocode
https://api.radar.io/v1/geocode/reverse

api key: key

coordinates = str(latitude) + "," + str(longitude)
usage: url, "Authorization": f"{api_key}", params = {"coordinates": coordinates}
