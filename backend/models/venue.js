const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  google_maps_pin: { type: String, required: true },
  // created_at: { type: Date, default: Date.now },
  qr: { type: String, required: true },
});

module.exports = mongoose.model('Venue', venueSchema);