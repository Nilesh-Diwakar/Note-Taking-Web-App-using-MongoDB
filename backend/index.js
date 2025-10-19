
const express = require("express");
require("dotenv").config();
const notes = require("./routes/notes");
const authRoutes = require("./routes/auth");
const connectWithDb = require("./config/database");
const cookieParser = require("cookie-parser");

const app =  express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// middleWare
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser()); // ✅ Enable reading cookies from client
app.use(cors({
    origin: FRONTEND_URL,  // allow frontend origin
    credentials: true, // ✅ this line is mandatory when using withCredentials:true
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// mount
app.use("/api/v1", notes);
app.use("/api/v1/auth", authRoutes);

connectWithDb();

app.get("/", (req, res) => {
    res.send(`<h1>This is Homepage for note taking web app!</h1>`)
});

// starting the server
app.listen(PORT, () => {
    console.log(`App is runnning Successfully at Port no ${PORT}.`);
});

