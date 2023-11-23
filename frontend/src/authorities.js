
import React, { useState, useEffect } from 'react'
import './App.css';

function AuthoritiesUpdate(){
    const [dataWeather, setDataWeather] = useState({});
    const [city, setCity] = useState('');
    const dayOneHours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

    useEffect(() => {
    fetch('/home')
        .then(response => response.json())
        .then(json => setDataWeather(json))
        .catch(error => console.error(error));
    }, []);

    const weathercheck = (e) => {
        e.preventDefault();
        setCity(city);

        fetch(`/weatherbycity/${city}`)
        .then(response => response.json())
        .then(json => setDataWeather(json))
        .catch(error => console.error(error));
    }

    const renderAlerts = () => {
    if (dataWeather.alerts && dataWeather.alerts.length > 0) {
      return (
        <div>
          <h3>Alert Data for {city}</h3>
          {dataWeather.alerts.map((alert, index) => (
            <div key={index}>
              <p>Alert {index + 1}: {alert}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Alert Data for {city}</h3>
          <p>No alerts currently</p>
        </div>
      );
    }
  }

    return (
        <div>
            <br/>
            <br/>
            <form onSubmit={weathercheck}>
                <label>
                    <input
                        type="text"
                        required
                        name={city}
                        value={city}
                        placeholder="Authorities enter city name"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <input type="submit" value="Get Weather Data" />
            </form>

            {/* <p>{JSON.stringify(data)}</p>  */}
            {Object.keys(dataWeather).length > 0 && dataWeather !== "Hello World" &&
            (
              <div>
              {/* Render weather information from /weatherAlert/<city> */}
              {renderAlerts()}
              {/*dataWeather.alerts.length > 0 ? <p>Example: {dataWeather.alerts}</p> : <p>No current alert</p>*/}

                {/* Render weather information from /weatherbycity/<city> */}

                {/* Current Weather */}
                <div className="flex-container">
                  <div className="weather-box" align="left">
                      <h3>Current Weather <img src={dataWeather.current.icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h3>
                      <p>Region: {dataWeather.current.region}</p>
                      <p>Condition:  {dataWeather.current.condition}</p>
                      <p>Current Temp: {dataWeather.current.current_temp}</p>
                      <p>Feels like: {dataWeather.current.feels_like}</p>
                      <p>Air quality index:  {dataWeather.current.air_quality_idx}</p>
                      <p>Rain (mm): {dataWeather.current.rain_mm}</p>
                      <p>UV: {dataWeather.current.uv}</p>
                      <p>Wind Speed: {dataWeather.current.wind_speed}</p>
                  </div>

                  <div className="weather-box" align="left">
                      <h3>{dataWeather["0"].date} <img src={dataWeather["0"].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h3>
                      <p>Condition:  {dataWeather["0"].condition}</p>
                      <p>Maximum Temp: {dataWeather["0"].maxtemp}</p>
                      <p>Minimum Temp: {dataWeather["0"].mintemp}</p>
                      <p>Average Temp: {dataWeather["0"].avgtemp}</p>
                      <p>Air quality index:  {dataWeather["0"].air_quality_today}</p>
                      <p>UV: {dataWeather["0"].uv}</p>
                      <p>Wind Speed: {dataWeather["0"].maxwind}</p>
                      <p>Chance of Rain: {dataWeather["0"].rain_chance}</p>
                      <p>Chance of Snow: {dataWeather["0"].snow_chance}</p>
                      <p>Sunrise: {dataWeather["0"].sunrise}</p>
                      <p>Sunset: {dataWeather["0"].sunset}</p>
                  </div>

                  <div className="weather-box" align="left">
                      <h3>{dataWeather["1"].date} <img src={dataWeather["1"].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h3>
                      <p>Condition:  {dataWeather["1"].condition}</p>
                      <p>Maximum Temp: {dataWeather["1"].maxtemp}</p>
                      <p>Minimum Temp: {dataWeather["1"].mintemp}</p>
                      <p>Average Temp: {dataWeather["1"].avgtemp}</p>
                      <p>Air quality index:  {dataWeather["1"].air_quality_today}</p>
                      <p>UV: {dataWeather["1"].uv}</p>
                      <p>Wind Speed: {dataWeather["1"].maxwind}</p>
                      <p>Chance of Rain: {dataWeather["1"].rain_chance}</p>
                      <p>Chance of Snow: {dataWeather["1"].snow_chance}</p>
                      <p>Sunrise: {dataWeather["1"].sunrise}</p>
                      <p>Sunset: {dataWeather["1"].sunset}</p>
                  </div>
                </div>

                {/* Forecast for the first day */}
                <h3>Forecast on {dataWeather["0"].date}</h3>
                <div className="flex-container-forecast">
                  {dayOneHours.map((hour) => (
                    <div className="weather-box-forecast" align="left" key={hour}>
                      <h4>{dataWeather["0"][hour].time.split(' ')[1]} <img src={dataWeather["0"][hour].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h4>
                      <p>AQI:  {dataWeather["0"][hour].air_quality}</p>
                      <p>Rain: {dataWeather["0"][hour].chance_of_rain}</p>
                      <p>Snow: {dataWeather["0"][hour].chance_of_snow}</p>
                      <p>Condition:  {dataWeather["0"][hour].condition}</p>
                      <p>Feels like: {dataWeather["0"][hour].feelslike_c}</p>
                      <p>Temp: {dataWeather["0"][hour].temp_c}</p>
                      <p>UV: {dataWeather["0"][hour].uv}</p>
                      <p>Wind: {dataWeather["0"][hour].wind_kph}</p>
                    </div>
                  ))}
                </div>

                {/* Forecast for the second day */}
                <h3>Forecast on {dataWeather["1"].date}</h3>
                <div className="flex-container-forecast">
                {dayOneHours.map((hour) => (
                <div className="weather-box-forecast" align="left" key={hour}>
                  <h4>{dataWeather["1"][hour].time.split(' ')[1]} <img src={dataWeather["1"][hour].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h4>
                  <p>AQI:  {dataWeather["1"][hour].air_quality}</p>
                  <p>Rain: {dataWeather["1"][hour].chance_of_rain}</p>
                  <p>Snow: {dataWeather["1"][hour].chance_of_snow}</p>
                  <p>Condition:  {dataWeather["1"][hour].condition}</p>
                  <p>Feels like: {dataWeather["1"][hour].feelslike_c}</p>
                  <p>Temp: {dataWeather["1"][hour].temp_c}</p>
                  <p>UV: {dataWeather["1"][hour].uv}</p>
                  <p>Wind: {dataWeather["1"][hour].wind_kph}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
      <br />
      <br />
    </div>
  );
}

export default AuthoritiesUpdate;
