const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analyze', async (req, res) => {
    try {
        const userText = req.body.text;
        if (!userText) return res.status(400).json({ error: "Text is missing!" });

        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        const prompt = `Analyze this text: '${userText}'. Is this a harassment or threat situation? Reply strictly with YES or NO.`;

        const result = await model.generateContent(prompt);
        const aiAnswer = result.response.text().trim().toUpperCase();

        console.log("Gemini Answer:", aiAnswer);

        if (aiAnswer === "YES") {
            return res.json({ status: "Yellow Alert", threat: true });
        } else {
            return res.json({ status: "Safe", threat: false });
        }
    } catch (error) {
        console.error("AI Error:", error.message || error);
        res.status(500).json({ error: "AI Engine error", details: error.message || String(error) });
    }
});

module.exports = router;