const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/user");

//register user

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        console.log(user);

        return res.status(201).json({
            message: "User created successfully",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
});


//login user

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        // Login successful
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

module.exports = router;

