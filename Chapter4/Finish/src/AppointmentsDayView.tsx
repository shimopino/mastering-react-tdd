import React, { useState } from "react";

const appointmentTimeOfDay = (startsAt: number) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

export const Appointment = ({
  customer,
  service,
  stylist,
  notes,
  startsAt,
}: {
  customer: { firstName: string; lastName: string; phoneNumber: string };
  service: string;
  stylist: string;
  notes: string;
  startsAt: number;
}) => {
  return (
    <div>
      <h3>Today&rsquo;s appointment at {appointmentTimeOfDay(startsAt)}</h3>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {customer.firstName} {customer.lastName}
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const AppointmentsDayView = ({
  appointments,
}: {
  appointments: {
    customer: { firstName: string; lastName: string; phoneNumber: string };
    service: string;
    stylist: string;
    notes: string;
    startsAt: number;
  }[];
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, index) => (
          <li key={appointment.startsAt}>
            <button
              type="button"
              className={index === selectedAppointment ? "toggled" : ""}
              onClick={() => setSelectedAppointment(index)}
            >
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
