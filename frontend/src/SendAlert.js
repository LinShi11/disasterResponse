
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

function SendAlert(){
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        const user = sessionStorage.getItem('username');
        e.preventDefault();
        const data = {
            username: user, 
            city: city, 
        }

        fetch('/SendAlert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
    }

    return (
        <div>
            <br/>
            <br/>

            <div className="d-flex justify-content-center">
                <form className="d-flex" onSubmit={handleSubmit}>
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
                            Send
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SendAlert;
