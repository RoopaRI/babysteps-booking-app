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

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/appointments");
      setAppointments(res.data);
    } catch (error) {
      alert("Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      alert("Failed to cancel appointment");
    }
  };

  const updateAppointment = async (id) => {
    if (!updatedDate || !updatedTime) {
      alert("Please select a valid date and time.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/appointments/${id}`, {
        date: updatedDate,
        time: updatedTime,
      });

      alert(res.data.message);
      setEditMode(null);

      // Update state immediately instead of fetching all data again
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, date: updatedDate, time: updatedTime } : appt
        )
      );
    } catch (error) {
      alert("Failed to update appointment");
    }
  };

  const handleEditClick = (appointment) => {
    setEditMode(appointment._id);
    setUpdatedDate(new Date(appointment.date).toISOString().split("T")[0]); // Format YYYY-MM-DD
    setUpdatedTime(appointment.time);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setUpdatedDate("");
    setUpdatedTime("");
  };

  // Generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    let start = new Date();
    start.setHours(0, 0, 0, 0); // Start at midnight

    for (let i = 0; i < 48; i++) {
      slots.push(start.toTimeString().slice(0, 5)); // Format HH:MM
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
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
                    className="form-control me-2"
                  />

                  <select
                    className="form-control me-2"
                    value={updatedTime}
                    onChange={(e) => setUpdatedTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {generateTimeSlots().map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>

                  <button className="btn btn-success btn-sm me-2" onClick={() => updateAppointment(appointment._id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{appointment.doctorId.name}</strong> - {new Date(appointment.date).toISOString().split("T")[0]} at {appointment.time}
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(appointment)}>
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
