const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserDB');
const router = express.Router();
const { JWT_SECRET } = require('../config/config');

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({ username, email, password});

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create and return JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Login Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        userData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        console.log(userData);

        // Create and return JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: userData });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Example protected route
router.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}


module.exports = router;