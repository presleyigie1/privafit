const express = require("express");
const mysql = require("mysql2"); // Use mysql2 for better security
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For password hashing

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure the database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "privafit"
});

// Establish the connection to MySQL database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit if DB connection fails
    }
    console.log("SQL Database Successfully connected");
});

/**
 *  Signup Route: Hashes password before storing in DB
 */
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists
        const checkQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error("Database error on email check:", err);
                return res.status(500).json({ message: "Database error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: "Email already in use" });
            }

            // Hash the password before saving
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert new user with hashed password
            const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Error inserting user into DB:", err);
                    return res.status(500).json({ message: "Error creating account" });
                }

                console.log("Signup successful:", { username, email });
                res.status(201).json({ message: "Signup successful! You can now log in." });
            });
        });
    } catch (error) {
        console.error("Unexpected server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

/**
 *  Login Route: Verifies user and checks hashed password
 */
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Get the stored hashed password from database
    const query = "SELECT username, password FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "No user found" });
        }

        const storedHashedPassword = results[0].password;

        // Compare entered password with stored hashed password
        const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Successfully logged in
        res.status(200).json({
            message: "Logged in successfully",
            user: { username: results[0].username }
        });
    });
});

// Start the Express server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
