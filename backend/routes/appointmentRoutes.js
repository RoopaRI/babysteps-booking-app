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

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

    if (!doctorId || !date || !duration || !appointmentType || !patientName)
      return res.status(400).json({ error: "All fields except notes are required." });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointmentDate = new Date(date);
    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      $and: [
        { date: { $gte: appointmentDate, $lt: new Date(appointmentDate.getTime() + duration * 60000) } },
        { time: appointmentDate.toTimeString().slice(0, 5) },
      ],
    });

    if (overlappingAppointment) return res.status(400).json({ error: "Time slot already booked for this doctor" });

    const newAppointment = new Appointment({ doctorId, date: appointmentDate, duration, appointmentType, patientName, notes });
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

    const updatedDateTime = new Date(`${date}T${time}`);
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    const overlappingAppointment = await Appointment.findOne({
      doctorId: appointment.doctorId,
      date: updatedDateTime,
      time: updatedDateTime.toTimeString().slice(0, 5),
      _id: { $ne: appointmentId },
    });

    if (overlappingAppointment) return res.status(400).json({ error: "Time slot already booked for this doctor" });

    appointment.date = updatedDateTime;
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
