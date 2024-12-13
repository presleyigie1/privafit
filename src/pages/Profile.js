import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    //get the current logged in user 
    const user = JSON.parse(localStorage.getItem('user'));

    //do this when no userr is found, revert back to login page
    if(!user){
        //redirect to the login page
        navigate('/login');
        return null;
    }
    //handling the user logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    return(
        <div className="profile-page">
            <header className="profile-header">
                {/*display the username*/}
                <div className="username">{user.username}</div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>
            <main className="dashboard">
                <h1>Dashboard</h1>
                <p>Track your fitness here</p>
            </main>

        </div>
    )
}


export default Profile;