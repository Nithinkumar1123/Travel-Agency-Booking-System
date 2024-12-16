// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // The booking model
const Package = require('../models/Package'); // Assuming the package model is defined

// POST - Save booking data
router.post('/api/bookings', async (req, res) => {
  const { name, email, phone, travelers, specialRequest, packageId, packageTitle, packagePrice, totalPrice } = req.body;

  try {
    // Check if the package exists
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      travelers,
      specialRequest,
      packageId,
      packageTitle,
      packagePrice,
      totalPrice,
    });

    // Save booking to database
    await newBooking.save();
    return res.status(201).json(newBooking); // Send back the saved booking data

  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('packageId'); // Populate package details

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.status(200).json(bookings); // Send the populated bookings
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});


module.exports = router;
