import React, { useState } from 'react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/privafit-logo.png"


const Signup = () => {
    // State variables for user inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Handles the signup process with proper validation and secure transmission.
     */
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        // Sanitize inputs
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim();
        const sanitizedPassword = password.trim();
        const sanitizedConfirmPassword = confirmPassword.trim();

        // Validate input fields
        if (!validateEmail(sanitizedEmail)) {
            setError("Invalid email format.");
            return;
        }
        if (sanitizedPassword !== sanitizedConfirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!isPasswordStrong(sanitizedPassword)) {
            setError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: sanitizedUsername, email: sanitizedEmail, password: sanitizedPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Signup successful
                navigate('/login'); // Redirect to login
            } else {
                setError(data.message); // Display server error message
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    /**
     * Validates an email format.
     * @param {string} email - The email entered by the user.
     * @returns {boolean} - Returns true if the email format is valid.
     */
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Checks if a password meets security standards.
     * @param {string} password - The password entered by the user.
     * @returns {boolean} - Returns true if the password is strong.
     */
    const isPasswordStrong = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    return (
        <div className="signupPage">
            
            <div className="signup-container">
            <img src={logo} alt="PRIVAFIT logo" className="log-sign-logo" />
                <form onSubmit={handleSignup}>
                    <h2>Sign Up</h2>

                    {error && <p className="error-message">{error}</p>} {/* Display error messages */}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;