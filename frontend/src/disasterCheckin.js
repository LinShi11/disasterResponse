import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./disasterCheckin.css";

function DisasterCheckIn() {
  const [response, setResponse] = useState('');
  const { uname } = useParams();
  const { alertid } = useParams();
  const [returnval, setReturnval] = useState('');

  const handleResponse = (status) => {
    setResponse(status);
    console.log("Status: ", status)
    const updatedJson = { "username": uname, "alertid" : alertid, "message": status === "I am fine" ? "0" : "1" };
    
    fetch('/disasterCheckin', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJson),
    })
    .then((response) => response.json())
    .then((json) => {
        setReturnval(json.message);
    })
  };

  return (
    <div className="disaster-checkin-container">
      <h1>Disaster Check-In</h1>
      <p>Are you okay?</p>
      <div className="response-buttons">
        <button onClick={() => handleResponse('I am fine')}>I'm Fine</button>
        <button onClick={() => handleResponse('Need Help')}>Need Help</button>
      </div>
      {returnval && <p> {returnval}</p>}
    </div>
  );
}

export default DisasterCheckIn;
