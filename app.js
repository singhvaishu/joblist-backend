const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/api", jobRoutes);

module.exports = app;
