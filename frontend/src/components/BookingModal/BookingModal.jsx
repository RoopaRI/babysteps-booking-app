import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingModal.css";
import axios from "axios";
import API_BASE_URL from "../config"; // Import API base URL

const BookingModal = ({ doctor, selectedDate, setSelectedDate, slots, bookAppointment, close }) => {
  const [appointmentType, setAppointmentType] = useState("Routine Check-Up");
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(30); // ✅ Default duration
  const [nameError, setNameError] = useState(""); // ✅ Patient name validation error state

  const handleBooking = async () => {
    // ✅ Patient Name Validation: Only alphabets and spaces allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(patientName)) {
      setNameError("⚠️ Patient name should only contain alphabets.");
      return;
    }

    if (!selectedDate || !selectedSlot || !patientName || !appointmentType) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    const appointmentData = {
      doctorId: doctor._id,
      date: selectedDate,
      time: selectedSlot,
      duration, // ✅ Ensure duration is included
      appointmentType,
      patientName,
      notes,
    };

    console.log("📤 Sending Request:", appointmentData); // Debugging log

    try {
      const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
      alert("✅ " + response.data.message);
      close(); // Close modal after booking
    } catch (error) {
      console.error("❌ Error booking appointment:", error.response?.data || error);
      alert("🚨 Failed to book appointment: " + (error.response?.data.error || "Unknown error"));
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book Appointment with {doctor.name}</h5>
            <button type="button" className="close" onClick={close}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {/* Select Date */}
            <div className="form-group">
              <label>Select a date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                className="form-control"
                placeholderText="Choose a date"
              />
            </div>

            {/* Available Time Slots */}
            <div className="form-group">
              <label>Available Time Slots:</label>
              <div className="slot-container">
                {slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <button
                      key={index}
                      className={`slot-button ${selectedSlot === slot ? "selected" : ""}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="text-danger">No available slots for this date.</p>
                )}
              </div>
            </div>

            {/* Appointment Duration */}
            <div className="form-group">
              <label>Duration (minutes):</label>
              <select className="form-control" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            {/* Appointment Type */}
            <div className="form-group">
              <label>Appointment Type:</label>
              <select className="form-control" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)}>
                <option value="Routine Check-Up">Routine Check-Up</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>

            {/* Patient Name */}
            <div className="form-group">
              <label>Patient Name:</label>
              <input
                type="text"
                className="form-control"
                value={patientName}
                onChange={(e) => {
                  setPatientName(e.target.value);
                  setNameError(""); // ✅ Clear error when user types
                }}
                required
              />
              {nameError && <p className="text-danger">{nameError}</p>} {/* ✅ Show error message if invalid */}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label>Notes (Optional):</label>
              <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary mt-3" onClick={handleBooking} disabled={!selectedSlot}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
