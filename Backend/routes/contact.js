const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
// Submit contact form
router.post('/submit', async (req, res) => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;       
        console.log('Contact form received:', { firstName, lastName, email, subject });       
        // Save to database
        const newMessage = await Contact.create({
            firstName,
            lastName,
            email,
            subject,
            message
        });
        console.log('Message saved to database');  
        res.json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.',
            data: {
                id: newMessage._id,
                firstName: newMessage.firstName,
                lastName: newMessage.lastName,
                email: newMessage.email,
                subject: newMessage.subject
            }
        }); 
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
});
// Get all messages (Admin only - for later use)
router.get('/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            messages: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
module.exports = router;