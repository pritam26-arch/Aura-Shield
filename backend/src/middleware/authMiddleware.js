const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {
            // Token extract karein ("Bearer <token>")
            token = token.split(' ')[1];

            // Verify karein (Aap .env mein JWT_SECRET rakh sakte hain)
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

            req.user = decoded; // User data request mein attach kar do
            next(); // Aage badho
        } catch (error) {
            return res.status(401).json({ error: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ error: "Not authorized, no token" });
    }
};

module.exports = { protect };