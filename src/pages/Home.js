import React from 'react';
import { useNavigate } from 'react-router-dom';
//import '.Home.css'

const Home = () => {
    const navigate = useNavigate();
    return(
        //just testing the display
        <div className="Centered-container">
            <div>
                <h1>Welcome to PrivaFit</h1>
                <p> Your secure fitnees companion</p>
                <button onClick={() => navigate("/login")}>Get Started</button>
            </div>
        </div>
    );
};
export default Home;