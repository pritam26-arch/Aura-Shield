// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true // Ek number se ek hi account
  },
  // Emergency contacts ka array (Max 3 contacts for hackathon)
  emergencyContacts: [{
    name: String,
    phone: String,
    relation: String
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);