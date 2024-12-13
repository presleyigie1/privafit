import React, {useState} from 'react';
import '../styles/Login.css';
import {useNavigate} from'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); //meaning its logged in
                //saving the session token and user data in local storage
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log("Data from server:", data);
                //sends you to profile page once successfully logged in
                navigate("/profile")
            } else {
                alert(data.message); // No user found
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
        
    };

    return (
        //main container
        <div className="loginPage">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                    //creatinginput for the form
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button className="" type="submit">Login</button>
                    
                </form>
            </div>
        </div>
    );
};


export default Login;