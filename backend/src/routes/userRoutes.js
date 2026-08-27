// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// 1. POST /api/users/register (User Create + JWT Token Return)
router.post('/register', async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Check karein agar user pehle se hai
    let existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        token: generateToken(existingUser._id),
        user: existingUser
      });
    }

    // Naya user banayein
    const newUser = new User({ name, phone });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      token: generateToken(newUser._id),
      user: newUser
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// 2. POST /api/users/contacts (Emergency Contacts Update - Protected with Token)
router.post('/contacts', protect, async (req, res) => {
  try {
    const { contacts } = req.body; // frontend se contacts ka array aayega
    const userId = req.user.id; // Token se automatically user ki ID mil jayegi

    // User dhoondein aur contacts update karein
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { emergencyContacts: contacts } },
      { new: true } // Update hone ke baad naya data return karega
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Emergency contacts updated!", user: updatedUser });
  } catch (error) {
    console.error("Contacts Update Error:", error);
    res.status(500).json({ error: "Server error while saving contacts" });
  }
});

module.exports = router;