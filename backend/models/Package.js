const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
