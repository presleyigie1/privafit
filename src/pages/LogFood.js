import React from "react";
import { useNavigate } from "react-router-dom";
import FoodSearch from "../components/FoodSearch";
import "../styles/LogFood.css"; //
import Footer from "../components/Footer.js";
import logo from "../assets/privafit-logo.png"
import { Link } from 'react-router-dom';

const LogFood = () => {
  const navigate = useNavigate();

  // Get the current user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  // When a food is selected and calories are passed
  const handleAddCalories = (calories, protein) => {
    const calorieKey = `${username}_caloriesEaten`;
    const proteinKey = `${username}_proteinEaten`;
    const dateKey = `${username}_caloriesDate`;
    const today = new Date().toISOString().split("T")[0];
  
    const prevCalories = parseInt(localStorage.getItem(calorieKey) || 0);
    const prevProtein = parseFloat(localStorage.getItem(proteinKey) || 0);
  
    localStorage.setItem(calorieKey, prevCalories + parseInt(calories));
    localStorage.setItem(proteinKey, (prevProtein + parseFloat(protein)).toFixed(1));
    localStorage.setItem(dateKey, today);
  
    //direct back to profile dashboard when submitted
    navigate("/profile"); 
  };

  return (
    //logging food
    <div className="form-page">
      <Link to="/profile">
        <img src={logo} alt="PRIVAFIT logo" className="log-sign-logo" />
      </Link>
      <h2>Log Food</h2>
      <FoodSearch onAddCalories={handleAddCalories} />
      <Footer/>
    </div>
  );
};

export default LogFood;
