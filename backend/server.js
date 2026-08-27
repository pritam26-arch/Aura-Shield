const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Alert = require('./src/models/Alert');
const userRoutes = require('./src/routes/userRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const aiRoutes = require('./src/routes/aiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API Middlewares
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

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

// Socket.io Logic - Phase 5 (Real-Time Core Upgraded)
io.on('connection', (socket) => {
  console.log(`📡 Device connected: ${socket.id}`);

  // Jab frontend se SOS trigger hoga
  socket.on('trigger_sos', async (data) => {
    console.log("🚨 SOS EMERGENCY TRIGGERED! Data Received:", data);

    try {
      // 1. Evidence Lock: Database mein Alert save karein
      const newAlert = new Alert({
        triggerType: data.triggerType || 'VOICE_TRIGGER',
        location: data.location
      });
      await newAlert.save();
      console.log("💾 Evidence Alert saved to MongoDB.");

      // 2. The Broadcast: io.emit use kar rahe hain taaki har connected dashboard par alert jaye
      io.emit('receive_alert', {
        alertId: newAlert._id,
        triggerType: newAlert.triggerType,
        location: newAlert.location,
        timestamp: newAlert.createdAt,
        message: "URGENT SOS! Victim needs immediate assistance!",
        victimDetails: data.userInfo || "User info fetching..."
      });

      console.log("📡🔥 SOS BROADCASTED TO ALL EMERGENCY DASHBOARDS!");

    } catch (error) {
      console.error("❌ Error broadcasting SOS:", error);
    }
  });

  // Dashboard se alert resolve karne ka event
  socket.on('resolve_alert', async (data) => {
    console.log(`✅ Alert ${data.alertId} resolved by responder.`);
    io.emit('alert_resolved_update', { alertId: data.alertId });
  });

  socket.on('disconnect', () => {
    console.log(`📵 Device disconnected: ${socket.id}`);
  });
});

// Test Route
app.get('/', (req, res) => {
  res.send("Aura-Shield Backend is Running & Secure!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Aura-Shield Backend running on port ${PORT}`);
});