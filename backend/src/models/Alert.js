const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    default: "Anonymous_User_01" 
  },
  triggerType: { 
    type: String, 
    enum: ['VOICE', 'DROP', 'MANUAL', 'TEST'], 
    required: true 
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  audioEvidenceUrl: { 
    type: String, 
    default: null // Baad mein AI audio snippet link yahan save hoga
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Alert', alertSchema);