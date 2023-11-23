import './App.css';
import WeatherUpdate from './WeatherUpdate'
import React  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<WeatherUpdate />} />
        < Route path="/login" element={<Login />} />



      </Routes>
    </BrowserRouter>

  );
}

export default App;
