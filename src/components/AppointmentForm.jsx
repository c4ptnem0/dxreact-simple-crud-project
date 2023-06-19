import React from "react";
import moment from "moment";
import { Input, DatePicker, TimePicker, Form } from "antd";

const AppointmentForm = ({ editingAppointment, setEditingAppointment }) => {
  return (
    <>
      <Form.Item label="Firstname" style={{ width: 470 }}>
        <Input
          value={editingAppointment?.firstName}
          onChange={(e) => {
            setEditingAppointment((pre) => {
              return { ...pre, firstName: e.target.value };
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Lastname" style={{ width: 470 }}>
        <Input
          value={editingAppointment?.lastName}
          onChange={(e) => {
            setEditingAppointment((pre) => {
              return { ...pre, lastName: e.target.value };
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Reason" style={{ width: 470 }}>
        <Input
          value={editingAppointment?.reason}
          onChange={(e) => {
            setEditingAppointment((pre) => {
              return { ...pre, reason: e.target.value };
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Address" style={{ width: 470 }}>
        <Input
          value={editingAppointment?.address}
          onChange={(e) => {
            setEditingAppointment((pre) => {
              return { ...pre, address: e.target.value };
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Appointment Date" style={{ width: 470 }}>
        <DatePicker
          value={
            editingAppointment?.appointmentDate
              ? moment(editingAppointment.appointmentDate, "YYYY-MM-DD")
              : null
          }
          onChange={(date, dateString) => {
            setEditingAppointment((prev) => {
              return { ...prev, appointmentDate: dateString };
            });
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item label="Appointment Time" style={{ width: 470 }}>
        <TimePicker
          value={
            editingAppointment?.appointmentTime
              ? moment(editingAppointment.appointmentTime, "HH:mm")
              : null
          }
          onChange={(time, timeString) => {
            setEditingAppointment((prev) => {
              return { ...prev, appointmentTime: timeString };
            });
          }}
          format="h:mm A"
          use12Hours
          style={{ width: "100%" }}
        />
      </Form.Item>
    </>
  );
};

export default AppointmentForm;
