const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');  // ← YEH IMPORTANT HAI
// Register API
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        console.log(' Register:', { firstName, lastName, email });
        
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists!' 
            });
        }
        
        // Save to database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });
        
        console.log(' Saved to database:', newUser.email);
        
        // ✅ TOKEN GENERATE KARO
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: 'Registered!',
            token: token,  // ← YEH LINE IMPORTANT HAI
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Login API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password!' 
            });
        }
        
        //  TOKEN GENERATE KARO
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful!',
            token: token,  // ← YEH LINE IMPORTANT HAI
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });   
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;