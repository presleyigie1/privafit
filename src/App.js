import React from'react';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    //adding navigation links 
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/*<Route path="*" element={<Login />} />*/}

      </Routes>
    </Router>
  );
}

export default App;
