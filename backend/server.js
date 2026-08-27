const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Alert = require('./src/models/Alert'); 
const userRoutes = require('./src/routes/userRoutes'); 
const uploadRoutes = require('./src/routes/uploadRoutes'); // <-- NAYI LINE

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);
=======
// API Middlewares
app.use('/api/users', userRoutes); 
app.use('/api/upload', uploadRoutes); 
>>>>>>> origin/main

const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
  }).catch((err) => {
    console.error("❌ MongoDB Connection Error: ", err);
  });

// Socket.io Logic
io.on('connection', (socket) => {
  console.log(`📡 Device connected: ${socket.id}`);

  // Jab frontend se SOS trigger hoga
  socket.on('trigger_sos', async (data) => {
    console.log("🚨 SOS TRIGGERED! Data:", data);

    try {
      // 1. Database mein save karein (Evidence Locking)
      const newAlert = new Alert({
        triggerType: data.triggerType || 'TEST',
        location: data.location
      });
      await newAlert.save();
      console.log("💾 Alert saved to Database.");

      // 2. Police/Volunteer Dashboard ko instantly bhej dein
      socket.broadcast.emit('receive_alert', {
        ...data,
        alertId: newAlert._id, // DB ki ID bhi bhej rahe hain
        timestamp: newAlert.timestamp
      });

    } catch (error) {
      console.error("Error saving alert to DB:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`📵 Device disconnected: ${socket.id}`);
  });
});

// Ek simple Test Route (Browser mein check karne ke liye)
app.get('/', (req, res) => {
  res.send("Aura-Shield Backend is Running & Secure!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Aura-Shield Backend running on port ${PORT}`);
});