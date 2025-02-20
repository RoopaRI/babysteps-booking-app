const express = require("express");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Function to generate time slots within working hours
const generateTimeSlots = (startTime, endTime, interval) => {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
  
    while (current < end) {
      slots.push(current.toTimeString().slice(0, 5)); // Format HH:MM
      current.setMinutes(current.getMinutes() + interval);
    }
    return slots;
  };

// GET /doctors - Retrieve all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

// GET /doctors/:id/slots?date=YYYY-MM-DD - Get available slots for a doctor
router.get("/:id/slots", async (req, res) => {
    try {
      const { id } = req.params;
      const { date } = req.query;
  
      if (!date) return res.status(400).json({ error: "Date is required" });
  
      // Fetch doctor details
      const doctor = await Doctor.findById(id);
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });
  
      // Generate all possible slots based on doctor's working hours
      const allSlots = generateTimeSlots(doctor.workingHours.start, doctor.workingHours.end, doctor.interval);
  
      // Define start and end of the requested day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);
  
      // Fetch booked appointments for the given doctor and date
      const bookedAppointments = await Appointment.find({
        doctorId: id,
        date: { $gte: startOfDay, $lte: endOfDay },
      });
  
      // Extract booked time slots
      const bookedSlots = bookedAppointments.map(appt => appt.time);
  
      // Compute available slots (exclude booked ones)
      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
  
      res.json({ availableSlots });
    } catch (error) {
      console.error("❌ Error fetching available slots:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
