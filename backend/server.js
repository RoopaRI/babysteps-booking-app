const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Define Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: String,
    workingHours: { start: String, end: String },
    specialization: String,
    image: String
}, {versionKey: false});

const Doctor = mongoose.model("Doctor", doctorSchema);

// Test API route
app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

// GET /doctors - Retrieve all doctors
app.get("/doctors", async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors", error });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
