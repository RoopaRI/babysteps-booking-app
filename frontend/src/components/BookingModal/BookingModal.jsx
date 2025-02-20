import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookingModal.css';

const BookingModal = ({ doctor, selectedDate, setSelectedDate, slots, bookAppointment, close }) => {
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book Appointment with {doctor.name}</h5>
            <button type="button" className="close" onClick={close}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="modal-date">
                <p>Select a date:</p>
                <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                className="form-control"
                />
            </div>
            

            {selectedDate && (
              <>
                <p className="mt-3">Available Time Slots:</p>
                {slots.length > 0 ? (
                  <div className="d-flex flex-wrap">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        className="btn btn-outline-primary m-1"
                        onClick={() => bookAppointment(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-danger">No slots available</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
