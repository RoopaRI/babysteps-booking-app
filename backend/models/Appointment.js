const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  date: Date, // Date and time of appointment
  duration: Number, // e.g., 30 minutes
  appointmentType: String, // Routine Check-Up, etc.
  patientName: String,
  notes: String, // Optional
});

module.exports = mongoose.model("Appointment", appointmentSchema);
