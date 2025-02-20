const express = require("express");
const Doctor = require("../models/Doctor");
// const { format, parseISO, addMinutes, isBefore, isEqual } = require("date-fns");

const router = express.Router();

// GET /doctors - Retrieve all doctors
router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error });
    }
});

module.exports = router;
