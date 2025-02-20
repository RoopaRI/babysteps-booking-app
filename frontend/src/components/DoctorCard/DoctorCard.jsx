import React from "react";

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="col-sm-12 col-md-6 col-xl-6 mb-4">
      <div className="card shadow-lg border-0">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              src={doctor.image || "https://via.placeholder.com/150"}
              className="doctor-image"
              alt={doctor.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{doctor.name}</h5>
              <p className="card-text text-muted">{doctor.specialization}</p>
              <p className="fw-bold text-primary">
                {doctor.workingHours.start} - {doctor.workingHours.end}
              </p>
              <button className="btn btn-success w-100" onClick={() => onBook(doctor)}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
