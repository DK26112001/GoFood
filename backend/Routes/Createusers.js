const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYouTubechannel$#";
const bcrypt = require('bcryptjs');

// Create users route
router.post("/Createusers", [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const { name, email, location } = req.body;
        const user = await User.create({
            name,
            password: secPassword,
            email,
            location
        });
        res.json({ success: true, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Login user route
router.post("/loginuser", [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ success: false, errors: "Try logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ success: false, errors: "Try logging in with correct credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;
