const express = require('express');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const User = require('./models/User');
const indexRouter = require('./routes/index');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginFormQRCode', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', indexRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
