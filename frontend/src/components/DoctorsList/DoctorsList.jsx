import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorsList.css";
import DoctorCard from "../DoctorCard/DoctorCard";
import BookingModal from "../BookingModal/BookingModal";
import API_BASE_URL from "../config"; // Import API base URL

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/doctors`)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch doctors.");
        setLoading(false);
      });
  }, []);

  // Fetch available slots when doctor and date are selected
  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
      fetch(`${API_BASE_URL}/doctors/${selectedDoctor._id}/slots?date=${formattedDate}`)
        .then((res) => res.json())
        .then((data) => setAvailableSlots(data.availableSlots || [])) // Ensure we handle empty slots properly
        .catch(() => setAvailableSlots([]));
    }
  }, [selectedDate, selectedDoctor]);

  const bookAppointment = (slot) => {
    fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: selectedDoctor._id,
        date: selectedDate,
        time: slot,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Appointment booked successfully!");
        setSelectedDoctor(null);
      })
      .catch(() => alert("Failed to book appointment"));
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div>
      <h2 className="text-center mb-4">Meet Our Doctors</h2>
      <div className="row">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} onBook={setSelectedDoctor} />
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          slots={availableSlots}
          bookAppointment={bookAppointment}
          close={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorsList;
