const express = require("express");
const router = express.Router();
const Package = require("../models/Package"); // Your Mongoose model for packages

// POST /admin/packages - Add a new package
router.post("/packages", async (req, res) => {
  try {
    const { title, description, price, availableDates, image } = req.body;

    console.log("Received Data:", req.body); // Log the request body

    if (!title || !description || !price || !availableDates || !image) {
      console.log("Validation Error: Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPackage = new Package({
      title,
      description,
      price,
      availableDates,
      image,
    });

    await newPackage.save();
    res.status(201).json({ message: "Package added successfully", package: newPackage });
  } catch (error) {
    console.error("Error in POST /admin/packages:", error);
    res.status(500).json({ error: "Failed to add package" });
  }
});


module.exports = router;
