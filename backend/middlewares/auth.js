

const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({
            success: false,
            message: "Authorization denied" 
        });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ 
            success: false,
            message: "Invalid or expired token" 
        });
    }
};

