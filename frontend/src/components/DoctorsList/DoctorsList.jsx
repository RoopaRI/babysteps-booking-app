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
    fetch("http://localhost:5000/appointments/book", {
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
    <div className="container mt-5">
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


























// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./DoctorsList.css"; 

// const DoctorsList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/doctors")
//       .then((response) => response.json())
//       .then((data) => {
//         setDoctors(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch doctors.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading)
//     return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

//   if (error)
//     return <p className="text-danger text-center mt-4">{error}</p>;

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Meet Our Doctors</h2>
//       <div className="row">
//         {doctors.map((doctor) => (
//           <div key={doctor._id} className="col-sm-12 col-md-6 col-xl-4 mb-4">
//             <div className="card shadow-lg border-0">
//               <div className="row g-0 d-flex align-items-center">
//                 {/* Left Side - Image */}
//                 <div className="col-md-4 d-flex justify-content-center align-items-center">
//                   <img
//                     src={doctor.image || "https://via.placeholder.com/150"}
//                     className="doctor-image"
//                     alt={doctor.name}
//                   />
//                 </div>
//                 {/* Right Side - Details */}
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title">{doctor.name}</h5>
//                     <p className="card-text text-muted">{doctor.specialization}</p>
//                     <p className="fw-bold text-primary">
//                       {doctor.workingHours.start} - {doctor.workingHours.end}
//                     </p>
//                     <button className="btn btn-success w-100">Book Appointment</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;
