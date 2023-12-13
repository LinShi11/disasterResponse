import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./disasterCheckin.css";

function TaskCheckIn() {
  const [response, setResponse] = useState('');
  const { uname } = useParams();
  const { alertid } = useParams();
  const [returnval, setReturnval] = useState('');

  const handleResponse = (status) => {
    setResponse(status);
    console.log("Status: ", status)
    const updatedJson = { "username": uname, "task" : alertid, "message": "1" };
    
    fetch('http://localhost:5000/taskCheckin', {
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
      <h1>Task Check-In</h1>
      <p>Have you completed the task?</p>
      <div className="response-buttons">
        <button onClick={() => handleResponse('Complete')}>I'm Done</button>
      </div>
      {returnval && <p> {returnval}</p>}
    </div>
  );
}

export default TaskCheckIn;
