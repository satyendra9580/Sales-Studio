const express = require('express');
const router = express.Router();
const Venue = require('../models/venue');

// Get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new venue
router.post('/', async (req, res) => {
  const venue = new Venue({
    name: req.body.name,
    type: req.body.type,
    address: req.body.address,
    pincode: req.body.pincode,
    google_maps_pin: req.body.google_maps_pin,
    qr: req.body.qr,
  });

  try {
    const newVenue = await venue.save();
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a venue by ID
router.put('/:id', async (req, res) => {
  const { name, type, address, pincode, google_maps_pin, qr } = req.body;

  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      { name, type, address, pincode, google_maps_pin, qr },
      { new: true }
    );

    res.status(200).json(updatedVenue);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update venue', error: err.message });
  }
});

// Delete a venue by ID
router.delete('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json({ message: 'Venue deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;