
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

function WeatherUpdate(){
    const [data, setData] = useState({});
    const [city, setCity] = useState('');
    const userType = sessionStorage.getItem('userType');
    const dayOneHours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const navigate = useNavigate();
    // useEffect(() => {
    // fetch('/home')
    //     .then(response => response.json())
    //     .then(json => setData(json))
    //     .catch(error => console.error(error));
    // }, []);

    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (!user) {
          navigate('/login'); // Redirect to login if no user is found
        }
        else
        {
            const uname = {
                username: user, 
                userType: userType,
            };
            console.log(uname);
            fetch('http://localhost:5000/getUserCity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uname),
            })
            .then(response => response.json())
            .then((json) => {
                if (json.city !== "Not Found")
                {
                    console.log(json)
                    console.log(json.city)
                    setCity(json.city);
                }
            })
            .then({weathercheck})
        }
      }, [navigate]);


      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

    const weathercheck = (e) => {

        e.preventDefault();
        setCity(city);

        fetch(`http://localhost:5000/weatherbycity/${city}`)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }

    return (
        <div>
            <br/>
            <br/>

            <div className="d-flex justify-content-center">
                <form className="d-flex" onSubmit={weathercheck}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            required
                            name={city}
                            value={city}
                            placeholder="Enter city name"
                            onChange={(e) => setCity(e.target.value)}
                            aria-label="Search"
                            onFocus={() => setCity('')} 
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>


            {/* <p>{JSON.stringify(data)}</p>  */}
            {Object.keys(data).length > 0 && data !== "Hello World" &&
                (
                <div>

                    <div className="flex-container">
                        <div className="weather-box" align="left">
                            <h4>Current Weather <img src={data.current.icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h4>
                            <p>Region: {data.current.region}</p>
                            <p>Condition:  {data.current.condition}</p>
                            <p>Current Temp: {data.current.current_temp}</p>
                            <p>Feels like: {data.current.feels_like}</p>
                            {/* <p>Air quality index:  {data.current.air_quality_idx}</p> */}
                            <p>Rain (mm): {data.current.rain_mm}</p>
                            <p>UV: {data.current.uv}</p>
                            <p>Wind Speed: {data.current.wind_speed}</p>
                        </div>

                        <div className="weather-box" align="left">
                            <h4>{data["0"].date} <img src={data["0"].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h4>
                            <p>Condition:  {data["0"].condition}</p>
                            <p>Maximum Temp: {data["0"].maxtemp}</p>
                            <p>Minimum Temp: {data["0"].mintemp}</p>
                            <p>Average Temp: {data["0"].avgtemp}</p>
                            {/* <p>Air quality index:  {data["0"].air_quality_today}</p> */}
                            <p>UV: {data["0"].uv}</p>
                            <p>Wind Speed: {data["0"].maxwind}</p>
                            <p>Chance of Rain: {data["0"].rain_chance}</p>
                            <p>Chance of Snow: {data["0"].snow_chance}</p>
                            <p>Sunrise: {data["0"].sunrise}</p>
                            <p>Sunset: {data["0"].sunset}</p>
                        </div>

                        <div className="weather-box" align="left">
                            <h4>{data["1"].date} <img src={data["1"].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h4>
                            <p>Condition:  {data["1"].condition}</p>
                            <p>Maximum Temp: {data["1"].maxtemp}</p>
                            <p>Minimum Temp: {data["1"].mintemp}</p>
                            <p>Average Temp: {data["1"].avgtemp}</p>
                            {/* <p>Air quality index:  {data["1"].air_quality_today}</p> */}
                            <p>UV: {data["1"].uv}</p>
                            <p>Wind Speed: {data["1"].maxwind}</p>
                            <p>Chance of Rain: {data["1"].rain_chance}</p>
                            <p>Chance of Snow: {data["1"].snow_chance}</p>
                            <p>Sunrise: {data["1"].sunrise}</p>
                            <p>Sunset: {data["1"].sunset}</p>
                        </div>

                    </div>
                    {/* {JSON.stringify(data, null, 2)} */}
                    <h4>Forecast on {data["0"].date}</h4>
                    <div className="flex-container-forecast">
                        {dayOneHours.map((hour) => (
                            <div className="weather-box-forecast" align="left" key={hour}>
                                <h5>{data["0"][hour].time.split(' ')[1]} <img src={data["0"][hour].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h5>
                                {/* <p>AQI:  {data["0"][hour].air_quality}</p> */}
                                <p>Rain: {data["0"][hour].chance_of_rain}</p>
                                <p>Snow: {data["0"][hour].chance_of_snow}</p>
                                <p>Condition:  {data["0"][hour].condition}</p>
                                <p>Feels like: {data["0"][hour].feelslike_c}</p>
                                <p>Temp: {data["0"][hour].temp_c}</p>
                                <p>UV: {data["0"][hour].uv}</p>
                                <p>Wind: {data["0"][hour].wind_kph}</p>

                            </div>

                        ))}

                    </div>
                    <h4>Forecast on {data["1"].date}</h4>
                    <div className="flex-container-forecast">
                        {dayOneHours.map((hour) => (
                            <div className="weather-box-forecast" align="left" key={hour}>
                                <h5>{data["1"][hour].time.split(' ')[1]} <img src={data["1"][hour].icon} alt="Weather Icon" style={{ width: '20%', height: '20%' }} /> </h5>
                                {/* <p>AQI:  {data["1"][hour].air_quality}</p> */}
                                <p>Rain: {data["1"][hour].chance_of_rain}</p>
                                <p>Snow: {data["1"][hour].chance_of_snow}</p>
                                <p>Condition:  {data["1"][hour].condition}</p>
                                <p>Feels like: {data["1"][hour].feelslike_c}</p>
                                <p>Temp: {data["1"][hour].temp_c}</p>
                                <p>UV: {data["1"][hour].uv}</p>
                                <p>Wind: {data["1"][hour].wind_kph}</p>

                            </div>

                        ))}

                    </div>



                </div>
                )
            }
            <br/>
            <br/>

        </div>
    )
}

export default WeatherUpdate;
