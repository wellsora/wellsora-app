import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import SoraHealth from './Components/SoraHealth';
import ConnectingBoard from './Components/ConnectingBoard';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sora-health" element={<SoraHealth />} />
          <Route path="/connecting-board" element={<ConnectingBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
