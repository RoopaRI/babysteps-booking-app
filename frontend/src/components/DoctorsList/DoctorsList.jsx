import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch doctors.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

  if (error)
    return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meet Our Doctors</h2>
      <div className="row">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card shadow-lg border-0">
              <img
                src={doctor.image || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={doctor.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text text-muted">{doctor.specialization}</p>
                <p className="fw-bold text-primary">
                  {doctor.workingHours.start} - {doctor.workingHours.end}
                </p>
                <button className="btn btn-success w-100">Book Appointment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
