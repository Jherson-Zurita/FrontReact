import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { green, yellow } from '@mui/material/colors';

const appointments = [
  { id: 1, date: '2024-06-10', time: '10:00 AM', doctor: 'Dr. Smith', specialty: 'Cardiology' },
  { id: 2, date: '2024-06-11', time: '11:00 AM', doctor: 'Dr. Johnson', specialty: 'Neurology' },
  { id: 3, date: '2024-06-12', time: '01:00 PM', doctor: 'Dr. Brown', specialty: 'Dermatology' },
];

const notifications = [
  { id: 1, message: 'Your appointment with Dr. Smith has been confirmed.' },
  { id: 2, message: 'Reminder: Your appointment with Dr. Johnson is tomorrow at 11:00 AM.' },
];

function Main() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 , backgroundImage: 'linear-gradient(45deg, #007BFF 30%, #0000FF 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: 3,}}>
            <Typography variant="h6" gutterBottom>
              Citas Programadas
            </Typography>
            <Box>
              {appointments.map((appointment) => (
                <Paper key={appointment.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="body1">
                    {appointment.date} - {appointment.time}
                  </Typography>
                  <Typography variant="body2">
                    {appointment.doctor} - {appointment.specialty}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 , backgroundImage: 'linear-gradient(45deg, #40E0D0 30%, #00008B 90%)'}}>
            <Typography variant="h6" gutterBottom>
              Notificaciones y Recordatorios
            </Typography>
            <Box>
              {notifications.map((notification) => (
                <Paper key={notification.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="body2">
                    {notification.message}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 , backgroundImage: 'linear-gradient(45deg, #ADD8E6 30%, #00008B 90%)'}}>
            <Typography variant="h6" gutterBottom>
              Detalles de Citas Programadas
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Especialidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;
