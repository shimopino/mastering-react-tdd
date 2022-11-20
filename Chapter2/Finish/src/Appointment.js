import React from "react";

export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = () => {
  return (
    <div id="appointmentsDayView">
      <ol />
    </div>
  );
};
