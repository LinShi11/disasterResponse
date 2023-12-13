import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Alerts.css';

function Alerts() {
    const [alerts, setAlerts] = useState({}); 
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (!user) {
          navigate('/login'); // Redirect to login if no user is found
        }
        else
        {
            const uname = {username: user};
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


      const weathercheck = (e) => {

        e.preventDefault();
        setCity(city);

        fetch(`http://localhost:5000/weatherbycity/${city}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(json => {
            const extractedAlerts = json.alerts || [];
            setAlerts(extractedAlerts);
        })
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

            <div>
                <h4>Alerts</h4>
                <div>
                {Array.isArray(alerts) && alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                        <div key={index}>
                            <p>Headline: {alert.headline}</p>
                            <p>Category: {alert.category}</p>
                <p>Urgency: {alert.urgency}</p>
                <p>Severity: {alert.severity}</p>
                <p>Certainty: {alert.certainty}</p>
                <p>Description: {alert.desc}</p>
                <p>Effective Time: {alert.effective}</p>
                <p>Expiration Time: {alert.expires}</p>
                <p>Instruction: {alert.instruction}</p>
                <p>Message Type: {alert.msgtype}</p>
                <p>Note: {alert.note}</p>
                        </div>
                    ))
                ) : (
                    <p>No alerts available</p>
                )}
                
                </div>
            </div>

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


        </div>
    );

}

export default Alerts;