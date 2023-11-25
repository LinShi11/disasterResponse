// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState({});
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
            .then((json) => {
              if (json.message === 'Login successful') {
                // Successful login, redirect to weather update page
                sessionStorage.setItem('username', username);
                console.log(sessionStorage);
                setResult(json);
                navigate('/home');
              }
              else
              {
                setResult(json);
              }
            })
            .catch((error) => {
              console.error('Error logging in:', error);
            });
        };

    return (
        <div>
            <div className="centered-container-login">
              <form onSubmit={handleSubmit}>
                <div class="input-box-login">
                  <input type="text" class="form-control m-bot" id="username" aria-describedby="Usernamehelp" placeholder="Username" 
                   value={username} onChange={(e) => setUsername(e.target.value)} />

                  <input type="password" class="form-control m-bot" id="password" placeholder="Password"
                   value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary input-box-login">Login</button>
                <p class="m-top">Don't have an account?</p>
                <a href="/signup" class="btn btn-secondary">Sign up</a>
              </form>

              {result.message === "Invalid credentials" &&
                (
                  <p className="text-danger mt-3">Invalid Username/password. Try again.</p>
              )}
            </div>
      </div>

    );
}

export default Login;
