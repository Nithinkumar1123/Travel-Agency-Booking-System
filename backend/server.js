const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models
const Package = require('./models/Package');
const Booking = require('./models/Booking');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://travel-agency-booking-system-11d5ai0cb.vercel.app/', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

// Routes

/** Packages */

// Get all packages
app.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching packages', error: err.message });
  }
});

// Get a single package by ID
app.get('/packages/:id', async (req, res) => {
  try {
    const packageDetails = await Package.findById(req.params.id);
    if (!packageDetails) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(packageDetails);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching package details', error: err.message });
  }
});

// Admin: Add a new package
app.post('/admin/packages', async (req, res) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newPackage = new Package({
      title,
      description,
      price,
      image,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add package', error: err.message });
  }
});

// Admin: Update a package
app.put('/admin/packages/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image } = req.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { title, description, price, image },
      { new: true },
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update package', error: err.message });
  }
});

// Admin: Delete a package
app.delete('/admin/packages/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete package', error: err.message });
  }
});

/** Bookings */

// Save a booking
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, travelers, specialRequest, packageId } = req.body;

  // Validation
  if (!name || !email || !phone || !travelers || !packageId) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    // Verify if the package exists
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const newBooking = new Booking({
      name,
      email,
      phone,
      travelers,
      specialRequest,
      packageId,
      packageTitle: packageData.title,
      packagePrice: packageData.price,
      totalPrice: packageData.price * travelers,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ message: 'Error saving booking', error: err.message });
  }
});

// Get all bookings (admin view)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('packageId', 'title price');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Get a single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('packageId', 'title price');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking', error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
