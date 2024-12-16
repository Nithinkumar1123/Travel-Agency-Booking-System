const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelers: { type: Number, required: true },
  specialRequest: { type: String },
  totalPrice: { type: Number, required: true },
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package',  // Reference to the Package model
    required: true 
  },
  packageTitle: { type: String, required: true },
  packagePrice: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
