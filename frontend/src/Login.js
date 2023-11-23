// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform authentication logic here and handle successful login
        // You'll use the `fetch` API to send login credentials to your Flask backend
        const data = {
            username: username,
            password: password,
        };
        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message === 'Login successful') {
                // Successful login, redirect to weather update page
                navigate('/weatherbycity');
              } else {
                // Handle invalid credentials error
                console.error('Invalid credentials');
              }
            })
            .catch((error) => {
              console.error('Error logging in:', error);
            });
        };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
