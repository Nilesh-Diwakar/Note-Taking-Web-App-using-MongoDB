


const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Helper to create cookie
const sendTokenCookie = (res, user) => {
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,       // cannot be accessed by JS
        secure: true,        // ✅ must be true for HTTPS (Render uses HTTPS)
        sameSite: "None",    // ✅ allows cross-origin cookies (Render ↔ Vercel)
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return token;
};

// ---------- SIGNUP ----------
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        // Generate JWT token
        sendTokenCookie(res, user);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Error Occurred in signup",
            error: err.message 
        });
    }
};

// ---------- LOGIN ----------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required" 
            });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ 
            success: false,
            message: "User not found" 
        });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ 
            success: false,
            message: "Invalid password" 
        });

        sendTokenCookie(res, user);

        res.status(200).json({
            success: true,
            message: "User Logined Successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Failed to login",
            error: err.message 
        });
    }
};

// ---------- GET LOGGED-IN USER ----------
exports.me = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// ---------- LOGOUT ----------
exports.logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "None",
        secure: true,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
};
