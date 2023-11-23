import './App.css';
import WeatherUpdate from './WeatherUpdate'
import AuthoritiesUpdate from './authorities'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React  from 'react';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WeatherUpdate />} />
          <Route path="/authority" element={<AuthoritiesUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
