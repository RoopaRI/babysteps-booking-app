const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/", async (req, res) => {
    try {
      const appointments = await Appointment.find().populate("doctorId"); // Populating doctor details
      res.status(200).json(appointments);
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
      res.status(500).json({ error: "Error fetching appointments" });
    }
  });
  

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

    if (!doctorId || !date || !duration || !appointmentType || !patientName) {
      return res.status(400).json({ error: "All fields except notes are required." });
    }

    // Convert date to proper format
    const appointmentDate = new Date(date);

    const newAppointment = new Appointment({
      doctorId,
      date: appointmentDate, // Ensure date is stored properly
      duration,
      appointmentType,
      patientName,
      notes,
    });

    await newAppointment.save();
    
    console.log("✅ Appointment saved:", newAppointment); // Log for debugging
    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    res.status(500).json({ error: "Error booking appointment" });
  }
});

module.exports = router;
