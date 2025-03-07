require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const app = express();

//Middlewere to handle CORS

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

connectDB();
app.use("/api/v1/auth", authRoutes);

const uploadDir = path.join(__dirname, 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));