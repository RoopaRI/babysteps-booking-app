import { useEffect, useState } from "react";
import axios from "axios";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/appointments")
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Failed to fetch appointments"));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center">No appointments scheduled.</p>
      ) : (
        <ul className="list-group">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="list-group-item">
              <strong>{appointment.doctorId.name}</strong> - {appointment.date} at {appointment.time}
              <button className="btn btn-danger btn-sm float-end ms-2">
                Cancel
              </button>
              <button className="btn btn-warning btn-sm float-end" >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsList;
