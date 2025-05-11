import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/privafit-logo.png";
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  // Input and state hooks
  const [captchaToken, setCaptchaToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // cllback when reCAPTCHA is done
  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  // hndles form submission including CAPTCHA check and backend login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify you're not a robot.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Login successful
        alert(data.message); 
        localStorage.setItem('user', JSON.stringify(data.user)); 
        // Redirect to profile
        navigate("/profile"); 
      } else {
        // Display server error message
        alert(data.message); 
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="loginPage">
      
      <div className="login-container">
      <Link to="/profile">
        <img src={logo} alt="PRIVAFIT logo" className="log-sign-logo" />
      </Link>
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Google reCAPTCHA section */}
          <div className="captcha-wrapper">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
              onChange={handleCaptcha}
            />
          </div>

        
          <button type="submit">Login</button>
        </form>

        <p className="noAccount">Don't have an account?</p>
        <button
          className="signup-btn"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
