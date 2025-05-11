import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodSearch from "../components/FoodSearch.js";

const MetricsTracker = () => {
  // Initial state for tracking goals and calories
  const [goal, setGoal] = useState(2000);
  const [caloriesEaten, setCaloriesEaten] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [proteinEaten, setProteinEaten] = useState(0);

  // Toggles for showing food or exercise log forms
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);

  // State for managing exercise input
  const [exercise, setExercise] = useState({
    name: "",
    type: "Cardio",
    duration: 0,
    calories: 0,
    startTime: "",
  });

  const navigate = useNavigate();

  // Get current user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  // On component mount: check/reset calories based on date for this user
  useEffect(() => {
    if (username) {
      const eatenKey = `${username}_caloriesEaten`;
      const burnedKey = `${username}_caloriesBurned`;
      const dateKey = `${username}_caloriesDate`;
      const proteinKey = `${username}_proteinEaten`;
      const goalKey = `${username}_goal`;
      const today = new Date().toISOString().split("T")[0];
      const lastUpdated = localStorage.getItem(dateKey);

      // Load protein from localStorage
      const storedProtein = parseFloat(localStorage.getItem(proteinKey)) || 0;
      setProteinEaten(storedProtein);

      // Load goal from localStorage
      const storedGoal = parseInt(localStorage.getItem(goalKey));
      if (!isNaN(storedGoal)) {
        setGoal(storedGoal);
      }

      if (lastUpdated !== today) {
        // New day — reset both values
        localStorage.setItem(eatenKey, "0");
        localStorage.setItem(burnedKey, "0");
        localStorage.setItem(proteinKey, "0");
        localStorage.setItem(dateKey, today);
        setCaloriesEaten(0);
        setCaloriesBurned(0);
      } else {
        // Same day — load both values
        const storedEaten = parseInt(localStorage.getItem(eatenKey)) || 0;
        const storedBurned = parseInt(localStorage.getItem(burnedKey)) || 0;
        setCaloriesEaten(storedEaten);
        setCaloriesBurned(storedBurned);
      }
    }
  }, [username]);

  // Keep calories synced when window regains focus
  useEffect(() => {
    const syncCalories = () => {
      const storedCalories = parseInt(localStorage.getItem(`${username}_caloriesEaten`) || 0);
      setCaloriesEaten(storedCalories);
    };

    window.addEventListener("focus", syncCalories);
    return () => window.removeEventListener("focus", syncCalories);
  }, [username]);

  // Handles adding calories and updating state/localStorage
  const handleAddCalories = (amount) => {
    const calorieKey = `${username}_caloriesEaten`;
    const dateKey = `${username}_caloriesDate`;
    const today = new Date().toISOString().split("T")[0];

    setCaloriesEaten((prev) => {
      const newTotal = prev + amount;
      localStorage.setItem(calorieKey, newTotal);
      localStorage.setItem(dateKey, today);
      return newTotal;
    });
  };

  // Handle logging an exercise entry
  const handleLogExercise = (e) => {
    e.preventDefault();
    const burnedKey = `${username}_caloriesBurned`;
    const dateKey = `${username}_caloriesDate`;
    const today = new Date().toISOString().split("T")[0];

    setCaloriesBurned((prev) => {
      const newTotal = prev + parseInt(exercise.calories);
      localStorage.setItem(burnedKey, newTotal);
      localStorage.setItem(dateKey, today);
      return newTotal;
    });

    setExercise({ name: "", type: "Cardio", duration: 0, calories: 0, startTime: "" });
    setShowExerciseForm(false);
  };

  // calculating the percentaage from the goal
  const progress = Math.min((caloriesEaten / goal) * 100, 100);

  return (
    <div className="metrics-container">
      <h2>
        Daily Calorie Progress
        {caloriesEaten > 0 && (
          <span style={{ fontSize: "16px", marginLeft: "10px", color: "#b0ffb0" }}>
            | Eaten: {caloriesEaten} cal
          </span>
        )}
        {goal > 0 && (
          <span style={{ fontSize: "16px", marginLeft: "10px", color: "#ddd" }}>
            | Goal: {goal} cal
          </span>
        )}
        {caloriesBurned > 0 && (
          <span style={{ fontSize: "16px", marginLeft: "10px", color: "#ffaaaa" }}>
            | Burned: {caloriesBurned} cal
          </span>
        )}
        {proteinEaten > 0 && (
          <span style={{ fontSize: "16px", marginLeft: "10px", color: "#ffd966" }}>
            | Protein: {proteinEaten} g
          </span>
        )}
      </h2>

      {/* Circular Progress Bar */}
      <div className="circular-progress">
        <svg viewBox="0 0 150 150">
          <defs>
            <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6a11cb" />
              <stop offset="100%" stopColor="#2575fc" />
            </linearGradient>
          </defs>
          <circle className="background" cx="75" cy="75" r="65" strokeWidth="10" />
          <circle
            className="progress-value"
            cx="75"
            cy="75"
            r="65"
            stroke="url(#gradient)"
            strokeWidth="10"
            strokeDasharray={408}
            strokeDashoffset={408 - (progress / 100) * 408}
          />
        </svg>
        <div className="progress-text">{Math.round(progress)}%</div>
      </div>

      {/* Goal Setter */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newGoal = parseInt(e.target.goal.value);
          setGoal(newGoal);
          localStorage.setItem(`${username}_goal`, newGoal);
        }}
      >
        <div className="form-group">
          <label>Set Calorie Goal:</label>
          <input type="number" name="goal" placeholder="e.g. 2000" required />
          <button type="submit">Update Goal</button>
        </div>
      </form>

      <div className="action-buttons">
        <button onClick={() => navigate("/log-food")}>Log Food</button>
        <button onClick={() => navigate("/log-exercise")}>Log Exercise</button>
      </div>

      {/* Food Search Form */}
      {showFoodForm && (
        <FoodSearch
          onAddCalories={(calories, protein) => {
            handleAddCalories(calories);

            // Update proteinEaten
            const proteinKey = `${username}_proteinEaten`;
            const prev = parseFloat(localStorage.getItem(proteinKey)) || 0;
            const updated = prev + parseFloat(protein);
            setProteinEaten(updated);
            localStorage.setItem(proteinKey, updated.toFixed(1));

            setShowFoodForm(false);
          }}
        />
      )}

      {/* Exercise Log Form */}
      {showExerciseForm && (
        <form onSubmit={handleLogExercise}>
          <div className="form-group">
            <label>Exercise Name:</label>
            <input
              type="text"
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select
              value={exercise.type}
              onChange={(e) => setExercise({ ...exercise, type: e.target.value })}
            >
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
            </select>
          </div>
          <div className="form-group">
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={exercise.duration}
              onChange={(e) => setExercise({ ...exercise, duration: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Calories Burned:</label>
            <input
              type="number"
              value={exercise.calories}
              onChange={(e) => setExercise({ ...exercise, calories: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <input
              type="time"
              value={exercise.startTime}
              onChange={(e) => setExercise({ ...exercise, startTime: e.target.value })}
              required
            />
          </div>
          <button type="submit">Log Exercise</button>
        </form>
      )}
    </div>
  );
};

export default MetricsTracker;
