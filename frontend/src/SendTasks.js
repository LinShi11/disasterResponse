
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

function SendTasks(){
    const [message, setMessage] = useState('');
    const [rescueTeam, setRescueTeam] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: rescueTeam, 
            message: message, 
        }

        fetch('http://localhost:5000/sendTask', {
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
            <br />
            <br />

            <div className="d-flex justify-content-center">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            required
                            name={message}
                            value={message}
                            placeholder="Enter the message"
                            onChange={(e) => setMessage(e.target.value)}
                            aria-label="Search"
                            onFocus={() => setMessage('')}
                        />
                        <input
                            className="form-control"
                            type="text"
                            required
                            name={rescueTeam}
                            value={rescueTeam}
                            placeholder="Enter rescue team name"
                            onChange={(e) => setRescueTeam(e.target.value)}
                            aria-label="Search"
                            onFocus={() => setRescueTeam('')}
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

export default SendTasks;
