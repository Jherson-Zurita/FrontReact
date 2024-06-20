import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { Schedule, CheckCircle, Error, Cancel, Refresh } from '@mui/icons-material';
import Appointment from '../../../models/Appointment';

const statusOptions = ['Scheduled', 'Completed', 'Missed', 'Cancelled', 'Rescheduled'];
const statusIcons = {
  Scheduled: Schedule,
  Completed: CheckCircle,
  Missed: Error,
  Cancelled: Cancel,
  Rescheduled: Refresh
};

function AppointmentEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment: passedAppointment } = location.state || {};

  const [appointment, setAppointment] = useState(passedAppointment || null);
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState(passedAppointment ? passedAppointment.status : '');
  const [medicalInfo, setMedicalInfo] = useState(passedAppointment ? passedAppointment.medicalInfo : '');

  useEffect(() => {
    if (!passedAppointment) {
      // Fetch all appointments if no appointment is passed
      const staticAppointments = [
        new Appointment(1, '2024-06-18', '11:00', 101, 201, 'Scheduled', 'Checkup'),
        new Appointment(2, '2024-06-19', '13:00', 102, 202, 'Completed', 'Follow-up'),
        new Appointment(3, '2024-06-21', '15:00', 103, 203, 'Scheduled', 'Consultation'),
      ];
      setAppointments(staticAppointments);
    }
  }, [passedAppointment]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleMedicalInfoChange = (event) => {
    setMedicalInfo(event.target.value);
  };

  const handleSubmit = () => {
    // Save the appointment changes
    alert('Appointment status updated successfully');
  };

  const handleAppointmentClick = (appointment) => {
    setAppointment(appointment);
    setStatus(appointment.status);
    setMedicalInfo(appointment.medicalInfo);
  };

  if (appointment) {
    return (
      <Box>
        <Typography variant="h4">Editar Cita</Typography>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{`Cita con ${appointment.doctor}`}</Typography>
            <Typography variant="body1">{`Fecha: ${appointment.date}`}</Typography>
            <Typography variant="body1">{`Hora: ${appointment.time}`}</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Estado</InputLabel>
              <Select value={status} onChange={handleStatusChange}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Información Médica"
              value={medicalInfo}
              onChange={handleMedicalInfoChange}
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const groupedAppointments = appointments.reduce((acc, status) => {
    acc[status] = statusOptions.filter((appt) => appt.status === status);
    console.log("acc:",acc);
    return acc;
  }, {
    Scheduled: [],
    Completed: [],
    Missed: [],
    Cancelled: [],
    Rescheduled: []
  });

  return (
    <Box>
      <Typography variant="h4">Citas</Typography>
      {statusOptions.map((status) => (
        <Box key={status} sx={{ mt: 2 }}>
          <Typography variant="h6">{status}</Typography>
          {groupedAppointments[status].length > 0 ? (
            groupedAppointments[status].map((appt) => {
              const IconComponent = statusIcons[appt.status];
              return (
                <Card
                  key={appt.id}
                  sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
                  onClick={() => handleAppointmentClick(appt)}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body1">{`Cita con ${appt.doctor}`}</Typography>
                    <Typography variant="body2">{`Fecha: ${appt.date}`}</Typography>
                    <Typography variant="body2">{`Hora: ${appt.time}`}</Typography>
                  </CardContent>
                  <IconComponent />
                </Card>
              );
            })
          ) : (
            <Typography variant="body2">No hay citas en esta categoría.</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default AppointmentEdit;
