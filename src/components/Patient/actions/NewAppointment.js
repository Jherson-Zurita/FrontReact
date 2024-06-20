import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem } from '@mui/material';
import Appointment from '../../../models/Appointment';

const doctors = [
  { name: 'Dr. Smith', specialty: 'Cardiology' },
  { name: 'Dr. Johnson', specialty: 'Neurology' },
];

function NewAppointment() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = new Appointment(
      Date.now(), // id
      date,
      time,
      doctor,
      'Pending', // status
      medicalInfo
    );
    // Aquí podrías enviar la nueva cita a la API o añadirla a una lista local
    console.log(newAppointment);
    // Reset form
    setDate('');
    setTime('');
    setDoctor('');
    setMedicalInfo('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Nueva Cita
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Hora"
            type="time"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Doctor"
            select
            fullWidth
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          >
            {doctors.map((doc, index) => (
              <MenuItem key={index} value={doc.name}>
                {doc.name} - {doc.specialty}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={2}>
          <TextField
            label="Información Médica"
            fullWidth
            multiline
            rows={4}
            value={medicalInfo}
            onChange={(e) => setMedicalInfo(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Reservar Cita
        </Button>
      </form>
    </Paper>
  );
}

export default NewAppointment;

