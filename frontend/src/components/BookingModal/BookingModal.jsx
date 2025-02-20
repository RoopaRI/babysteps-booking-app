import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingModal.css";
import axios from "axios";

const BookingModal = ({ doctor, selectedDate, setSelectedDate, slots, close }) => {
  const [duration, setDuration] = useState(30); // Default duration
  const [appointmentType, setAppointmentType] = useState("Routine Check-Up");
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");

  const handleBooking = async () => {
    if (!selectedDate || !patientName || !appointmentType) {
      alert("Please fill all required fields.");
      return;
    }

    const appointmentData = {
      doctorId: doctor._id,
      date: selectedDate,
      duration,
      appointmentType,
      patientName,
      notes,
    };

    try {
      const response = await axios.post("http://localhost:5000/appointments", appointmentData);
      alert(response.data.message);
      close(); // Close modal after booking
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
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
              />
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
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            {/* Notes */}
            <div className="form-group">
              <label>Notes (Optional):</label>
              <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary mt-3" onClick={handleBooking}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
