const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// configuring the databse connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "privafit"
});

//establishing the connection to sql databse 
db.connect((err) => {
    if (err) throw err;
    console.log("SQL Database Successfully connected");
});

// Login Endpoint
//hadnling the post reqqust
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    //sql querey to find the email and password
    const query = "SELECT username FROM users WHERE email = ? AND password = ?";

        //execute query with the parameters
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        console.log("Query results:", results);

        if (results.length > 0) {
            console.log("Username found:", results[0].username);
            const user = { username: results[0].username };
            return res.status(200).json({
                //success
                message: "Logged in successfully",
                //return the user object in response foiund in conssole
                user: user 
            });
        } else {
            //if no user is found
            return res.status(401).json({ message: "No user found" });
        }
    });
});
//start the exprees
app.listen(5000, () => {
    console.log("Server now running on http://localhost:5000");
});
