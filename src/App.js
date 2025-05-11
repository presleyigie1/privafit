import React from'react';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import LogFood from "./pages/LogFood";
import LogExercise from "./pages/LogExercise";
import Learn from "./components/Learn";

function App() {
  return (
    //adding navigation links 
    <Router>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/log-food" element={<LogFood/>}/>
        <Route path="/log-exercise" element={<LogExercise/>}/>
        <Route path="/learn" element={<Learn/>} />

      </Routes>
    </Router>
  );
}

export default App;
