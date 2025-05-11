import React, { useState } from "react";

const FoodSearch = ({ onAddCalories }) => {
  // Input for search term
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  // Quantity per result havoing 1 by default)
  const [quantities, setQuantities] = useState({});

  const [loading, setLoading] = useState(false);

  // Fetch food from Open Food Facts
  const searchFood = async () => {
    setLoading(true);
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();
    setResults(data.products || []);
    setLoading(false);
  };

  // Track quantity input per food item
  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Add calories and protein when "Add" button is clicked
  const handleAdd = (item, index) => {
    const kcalPer100g = Number(item.nutriments?.["energy-kcal_100g"]) || 0;
    const proteinPer100g = Number(item.nutriments?.["proteins_100g"]) || 0;
    const quantity = parseFloat(quantities[index] || 1); // Default to 1

    const totalCalories = quantity * kcalPer100g;
    const totalProtein = quantity * proteinPer100g;

    onAddCalories(Math.round(totalCalories), parseFloat(totalProtein.toFixed(2)));
  };

  return (
    <div className="food-search-container">
      <h3>Search for Food</h3>

      <input
        type="text"
        placeholder="e.g. Chicken, Rice, Egg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchFood}>Search</button>

      {loading && <p>Loading...</p>}

      <ul className="food-results">
        {results.slice(0, 5).map((item, index) => {
          const kcalPer100g = item.nutriments?.["energy-kcal_100g"];
          return (
            <li key={index} className="food-item">
              <strong>{item.product_name || "Unnamed Product"}</strong>{" "}
              – {kcalPer100g ? `${kcalPer100g} kcal/100g` : "No calorie info"}

              {kcalPer100g && (
                <div className="food-action">
                  {/* Quantity input field */}
                  <input
                    type="number"
                    min="1"
                    placeholder="Portions"
                    value={quantities[index] || 1}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    className="gram-input"
                  />

                  {/* Add button */}
                  <button
                    className="add-btn"
                    onClick={() => handleAdd(item, index)}
                  >
                    Add Calories
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FoodSearch;
