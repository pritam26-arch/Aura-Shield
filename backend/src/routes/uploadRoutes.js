// backend/src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Alert = require('../models/Alert');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup (Memory Storage - Data sidha RAM se Cloud jayega, Disk par nahi)
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/upload/audio
// 'audioFile' wo naam hai jis key mein frontend se file aayegi
router.post('/audio', upload.single('audioFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const { alertId } = req.body; // Frontend SOS trigger ke baad jo DB ID milegi, wo yahan bhejega

    // Direct Cloudinary Upload Stream
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            resource_type: 'video', // Cloudinary audio ko bhi 'video' type mein hi handle karta hai
            folder: 'aura_shield_evidence' 
          }, 
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    // Upload ka wait karein
    const result = await streamUpload(req);
    const audioUrl = result.secure_url;

    // Agar alertId mili hai, toh us Alert doc mein yeh URL hamesha ke liye lock kar dein
    if (alertId) {
      await Alert.findByIdAndUpdate(alertId, { audioEvidenceUrl: audioUrl });
      console.log(`🔒 Evidence Locked for Alert: ${alertId}`);
    }

    res.status(200).json({ 
      message: "Audio evidence uploaded and secured!", 
      url: audioUrl 
    });

  } catch (error) {
    console.error("Audio Upload Error:", error);
    res.status(500).json({ error: "Server error during audio upload" });
  }
});

module.exports = router;