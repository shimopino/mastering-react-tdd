import React from "react";

export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({ appointments }) => {
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment) => {
          return <li key={appointment.startsAt} />;
        })}
      </ol>
    </div>
  );
};
