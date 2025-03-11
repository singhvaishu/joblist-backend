const express = require('express');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');

const { loadStoreMaster } = require("./utils/storeMaster");

require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();


loadStoreMaster()
    .then(() => console.log("📦 Store Master Data Ready"))
    .catch((err) => {
        console.error("❌ Failed to load Store Master:", err);
        process.exit(1);
    });

app.use("/api", jobRoutes);

module.exports = app;
