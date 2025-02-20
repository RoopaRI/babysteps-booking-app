import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorsList.css";
import DoctorCard from "../DoctorCard/DoctorCard";
import BookingModal from "../BookingModal/BookingModal";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
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

  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      fetch(`http://localhost:5000/appointments/slots?doctorId=${selectedDoctor._id}&date=${selectedDate.toISOString()}`)
        .then((res) => res.json())
        .then((data) => setAvailableSlots(data.slots))
        .catch(() => setAvailableSlots([]));
    }
  }, [selectedDate, selectedDoctor]);

  const bookAppointment = (slot) => {
    fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: selectedDoctor._id,
        date: selectedDate,
        time: slot
      })
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
          doctorId={selectedDoctor._id}
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
