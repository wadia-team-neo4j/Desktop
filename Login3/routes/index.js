const express = require('express');
const QRCode = require('qrcode');
const User = require('../models/User');

const router = express.Router();

// Registration route
router.get('/', (req, res) => {
  res.render('registration',{title:'Fill Form',password:'',email:''});
});

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const user = await User.create(req.body);

    // Include multiple user details in the QR code data
    const userDetails = [
      { email: user.email, name: user.name, number: user.number, password: user.password },
      // Add more user details as needed
    ];

    const qrCodeData = JSON.stringify({ userDetails });
    QRCode.toFile(`public/qr-codes/${user.name}.png`, qrCodeData, function (err) {
      if (err) {
        console.error('Error generating QR code:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.render('success', { registrationId: user.name });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Include multiple user details in the QR code data
    const userDetails = [
      { email: user.email, name: user.name ,number: user.number, password: user.password },
      // Add more user details as needed
    ];

    const qrCodeData = JSON.stringify({ userDetails });
    QRCode.toFile(`public/qr-codes/${user.name}.png`, qrCodeData, function (err) {
      if (err) {
        console.error('Error generating QR code:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.render('success', { registrationId: user.name });
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;