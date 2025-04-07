require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
// const fs = require('fs');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const pollRoutes = require("./routes/pollRoutes");
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
app.use("/api/v1/poll", pollRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server runing on port ${PORT}`));

// frontend :
// cd .\frontend\
// cd .\polling-app\
// npm run dev
// backend : 
// npm start

