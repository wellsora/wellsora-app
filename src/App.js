import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import SoraHealth from './Components/SoraHealth';
import ConnectingBoard from './Components/ConnectingBoard';
import Dashboard_left from "./Components/dash-right";
import Privacy from './Components/Privacy';
import Benefits from './Components/Benefits';
import { Caregiver } from './Components/Caregiver';
import Settings from "./Components/Settings";
import Login from "./Components/Signin"
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sora-health" element={<SoraHealth />} />
          <Route path="/connecting-board" element={<ConnectingBoard />} />
          <Route path="/dashboard-left" element={<Dashboard_left />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/caregiver" element={<Caregiver />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signin" element={<Login/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;