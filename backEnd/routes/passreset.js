const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();
const User = require('../models/UserDB');


// In-memory storage for OTPs (in production, use a database)
const otpStore = new Map();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Route to request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // In production, verify if email exists in your database

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with timestamp (expire after 10 minutes)
    otpStore.set(email, {
      otp,
      timestamp: Date.now(),
      attempts: 0
    });

    // Send email
    const mailOptions = {
      from: {
        name: "Book Exchange Team",
        Address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpData = otpStore.get(email);

    if (!otpData) {
      return res.status(400).json({ error: 'No OTP request found' });
    }

    // Check if OTP is expired (10 minutes)
    if (Date.now() - otpData.timestamp > 600000) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      otpData.attempts += 1;

      // Lock out after 3 failed attempts
      if (otpData.attempts >= 3) {
        otpStore.delete(email);
        return res.status(400).json({ error: 'Too many failed attempts. Please request a new OTP.' });
      }

      return res.status(400).json({ error: 'Invalid OTP' });
    }

    await res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});


// Route to verify OTP and reset password
router.post('/reset-password', async (req, res) => {
  try {

    const { email, newPassword } = req.body;

    // Input validation
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and new password'
      });
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }


    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      });
    }

    otpStore.delete(email);

    // Update password
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during password update'
    });
  }
});


module.exports = router;