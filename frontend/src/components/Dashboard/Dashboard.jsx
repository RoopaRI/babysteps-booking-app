import { useState } from "react";
import DoctorsList from "../DoctorsList/DoctorsList";
import AppointmentsList from "../AppointmentList/AppointmentList";

const Dashboard = () => {
  const [showAppointments, setShowAppointments] = useState(false);

  return (
    <div className="container mt-5">
      {/* Toggle Button */}
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={() => setShowAppointments(!showAppointments)}>
          {showAppointments ? "Show Doctors" : "Show Booked Appointments"}
        </button>
      </div>

      {/* Conditionally Render Components */}
      {showAppointments ? <AppointmentsList /> : <DoctorsList />}
    </div>
  );
};

export default Dashboard;
