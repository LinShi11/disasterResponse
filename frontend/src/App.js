import './App.css';
import WeatherUpdate from './WeatherUpdate'
import AuthoritiesUpdate from './authorities'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React  from 'react';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import Settings from './Settings';
import Alerts from './Alerts';
import SendAlert from './SendAlert';
import "bootstrap/dist/css/bootstrap.min.css";
import Bar from "./Navigation/Bar.js";
import DisasterCheckIn from './disasterCheckin.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Bar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<WeatherUpdate />} />
          <Route path="/authority" element={<AuthoritiesUpdate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/sendAlert" element={<SendAlert />} />
          <Route path="/disasterCheckin/:uname" element={<DisasterCheckIn />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
