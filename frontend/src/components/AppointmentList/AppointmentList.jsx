import { useEffect, useState } from "react";
import axios from "axios";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get("http://localhost:5000/appointments")
      .then((res) => {
        setAppointments(res.data);
        console.log("Fetched Appointments:", res.data); // Debugging
      })
      .catch(() => alert("Failed to fetch appointments"));
  };

  const cancelAppointment = (id) => {
    axios.delete(`http://localhost:5000/appointments/${id}`)
      .then(() => {
        alert("Appointment canceled!");
        setAppointments(appointments.filter(appt => appt._id !== id));
      })
      .catch(() => alert("Failed to cancel appointment"));
  };

  const updateAppointment = (id) => {
    axios.put(`http://localhost:5000/appointments/${id}`, {
      date: updatedDate,
      time: updatedTime
    })
      .then(() => {
        alert("Appointment updated!");
        setEditMode(null);
        fetchAppointments();
      })
      .catch(() => alert("Failed to update appointment"));
  };

  return (
    <div>
      <h2 className="text-center">Your Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center">No appointments scheduled.</p>
      ) : (
        <ul className="list-group">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
              {editMode === appointment._id ? (
                <>
                  <input
                    type="date"
                    value={updatedDate}
                    onChange={(e) => setUpdatedDate(e.target.value)}
                    className="form-control"
                  />
                  <input
                    type="time"
                    value={updatedTime}
                    onChange={(e) => setUpdatedTime(e.target.value)}
                    className="form-control"
                  />
                  <button className="btn btn-success btn-sm" onClick={() => updateAppointment(appointment._id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{appointment.doctorId.name}</strong> - {appointment.date} at {appointment.time}
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditMode(appointment._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => cancelAppointment(appointment._id)}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsList;
