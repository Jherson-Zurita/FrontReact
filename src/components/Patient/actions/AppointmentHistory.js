import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Appointment from '../../../models/Appointment';

const fetchAppointments = async () => {
  // Simular llamada a la API
  const data = [
    { id: 1, date: '2023-05-01', time: '10:00', doctor: 'Dr. Smith', status: 'Completed', medicalInfo: 'Follow-up' },
    { id: 2, date: '2023-06-15', time: '14:00', doctor: 'Dr. Johnson', status: 'Pending', medicalInfo: 'Routine Check' },
  ];
  return data.map(Appointment.fromApiData);
};

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const appointments = await fetchAppointments();
      setAppointments(appointments);
    };

    loadAppointments();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Historial de Citas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Información Médica</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.medicalInfo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AppointmentHistory;

