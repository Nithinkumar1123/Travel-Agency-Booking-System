const express = require('express');
const Package = require('../models/Package');

const router = express.Router();

// Fetch all packages
router.get('/packages', async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

// Fetch package by ID
router.get('/packages/:id', async (req, res) => {
  const package = await Package.findById(req.params.id);
  res.json(package);
});

module.exports = router;
