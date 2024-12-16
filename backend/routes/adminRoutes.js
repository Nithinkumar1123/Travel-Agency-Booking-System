const express = require('express');
const Package = require('../models/Package');
const Booking = require('../models/Booking');

const router = express.Router();

// Add a package
router.post('/admin/packages', async (req, res) => {
  const pkg = new Package(req.body);
  await pkg.save();
  res.json({ message: 'Package added successfully!' });
});

// Update a package
router.put('/admin/packages/:id', async (req, res) => {
  await Package.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Package updated successfully!' });
});

// Delete a package
router.delete('/admin/packages/:id', async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: 'Package deleted successfully!' });
});

// View bookings
router.get('/admin/bookings', async (req, res) => {
  const bookings = await Booking.find().populate('packageId');
  res.json(bookings);
});

module.exports = router;
