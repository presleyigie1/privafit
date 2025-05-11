import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LogExercise.css"; // Importing CSS for styling
import Footer from "../components/Footer.js";
import logo from "../assets/privafit-logo.png"
import { Link } from 'react-router-dom';


const LogExercise = () => {
  // Form state for logging an exercise entry
  const [form, setForm] = useState({
    name: "",
    type: "Cardio",
    duration: "",
    calories: "",
    startTime: "",
  });

  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission: Save calories to localStorage and redirect to profile
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;

    if (!username) return;

    const burnKey = `${username}_caloriesBurned`;
    const prev = parseInt(localStorage.getItem(burnKey) || 0);
    const newTotal = prev + parseInt(form.calories);

    localStorage.setItem(burnKey, newTotal);
    navigate("/profile");
  };

  return (
    <div className="form-page">
      <Link to="/profile">
        <img src={logo} alt="PRIVAFIT logo" className="log-sign-logo" />
      </Link>
      <h2>Log Exercise</h2>

      <form onSubmit={handleSubmit} className="exercise-form">
        <label>Exercise Name:</label>
        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="e.g. Jogging, Push-ups"
          required
        />

        <label>Type:</label>
        <select name="type" onChange={handleChange} value={form.type}>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
        </select>

        <label>Duration (min):</label>
        <input
          name="duration"
          type="number"
          min="1"
          onChange={handleChange}
          value={form.duration}
          required
        />

        <label>Calories Burned:</label>
        <input
          name="calories"
          type="number"
          min="1"
          onChange={handleChange}
          value={form.calories}
          required
        />

        <label>Start Time:</label>
        <input
          name="startTime"
          type="time"
          onChange={handleChange}
          value={form.startTime}
          required
        />

        <button type="submit">Log Exercise</button>
      </form>
      <Footer/>
    </div>
    
  );
};

export default LogExercise;
