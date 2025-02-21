const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
});

// Create a new appointment (Fixed conflict check)
router.post("/", async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body); // Log incoming data
    const { doctorId, date, time, duration, appointmentType, patientName, notes } = req.body;

    if (!doctorId || !date || !time || !appointmentType || !patientName) {
      console.log("❌ Missing Fields:", { doctorId, date, time, appointmentType, patientName });
      return res.status(400).json({ error: "All fields except notes are required." });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointmentDate = new Date(date);
    appointmentDate.setUTCHours(0, 0, 0, 0); // Normalize to remove time inconsistencies

    // 🛑 Check for existing appointment at the exact date and time slot
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate, // Match the exact date
      time: time // Match the selected time slot
    });

    if (existingAppointment) {
      console.log("❌ Conflict: Time slot already booked!", existingAppointment);
      return res.status(400).json({ error: "Time slot already booked for this doctor" });
    }

    // ✅ No conflicts, proceed with booking
    const newAppointment = new Appointment({ doctorId, date: appointmentDate, time, duration, appointmentType, patientName, notes });
    await newAppointment.save();

    console.log("✅ Appointment saved:", newAppointment);
    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });

  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    res.status(500).json({ error: "Error booking appointment" });
  }
});

// Update Appointment
router.put("/:id", async (req, res) => {
    try {
      const { date, time } = req.body;
      const appointmentId = req.params.id;
  
      if (!date || !time) return res.status(400).json({ error: "Date and time are required." });
  
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) return res.status(404).json({ error: "Appointment not found" });
  
      // Convert date string to Date object
      appointment.date = new Date(date);
      appointment.time = time; // Ensure the time is updated
  
      await appointment.save();
  
      res.status(200).json({ message: "Appointment updated successfully!", appointment });
    } catch (error) {
      console.error("❌ Error updating appointment:", error);
      res.status(500).json({ error: "Error updating appointment" });
    }
  });

// Cancel Appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) return res.status(404).json({ error: "Appointment not found" });

    res.status(200).json({ message: "Appointment canceled successfully!", deletedAppointment });
  } catch (error) {
    console.error("❌ Error canceling appointment:", error);
    res.status(500).json({ error: "Error canceling appointment" });
  }
});

module.exports = router;
