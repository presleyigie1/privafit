import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"; // Import the CSS file
import MetricsTracker from "../components/MetricsTracking.js";
import Footer from "../components/Footer.js";
import logo from "../assets/privafit-logo.png"
import { Link } from 'react-router-dom';


const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    // Redirect to login if no user is found
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="profile-page">
            <Link to="/profile">
                <img src={logo} alt="PRIVAFIT logo" className="log-sign-logo" />
            </Link>
            <div className="profile-header">
                <span className="username">{user?.username || "User"}</span>
                <button className="learn-btn" onClick={() => navigate("/learn")}>
                    Learn
                </button>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>     
            </div>
            <br></br>
            <div className="dashboard-container">
                <div className="dashboard">
                    <h1>Welcome to Your Profile</h1>
                    <p>
                        Here you can view your fitness stats, update your profile, and track your progress.
                        Stay motivated and achieve your goals with our personalized dashboard.
                    </p>
                </div>
            </div>

            <br></br>

            <div className="fitness-stats">
            
                <h2>Your Fitness Stats</h2>
                <p>Track your daily activities, calories burned, and overall progress here.</p>
                
            </div>
            <div>
                {/*metrciks trakcer componenet */}
            <MetricsTracker />
            </div>

            <Footer/>
            
        </div>
        
        
        
    );
};

export default Profile;
