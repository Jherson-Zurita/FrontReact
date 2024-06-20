import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Appointment from '../../../models/Appointment';
import Doctor from '../../../models/Doctor';
import Patient from '../../../models/Patient';



function AppointmentSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');

  useEffect(() => {
    const patientsData = [
        new Patient(1, 'John', 'Doe', '1980-01-01', '123 Main St', '555-5555', 'john@example.com', 101),
        new Patient(2, 'Jane', 'Smith', '1990-02-02', '456 Elm St', '555-1234', 'jane@example.com', 102),
    ];
    setPatients(patientsData);
    // Fetch appointments or use static data
    const doctorsData = [
        new Doctor(101, 'Dr. Smith', 'Doe', 'Cardiologist', '555-1234', 'smith@example.com'),
        new Doctor(102, 'Dr. Johnson', 'Doe', 'Neurologist', '555-5678', 'johnson@example.com'),
    ];
    setDoctors(doctorsData);

    const staticAppointments = [
      new Appointment(1, '2024-06-18', '11:00', 101, 201, 'Scheduled', 'Checkup'),
      new Appointment(2, '2024-06-19', '13:00', 102, 202, 'Completed', 'Follow-up'),
      new Appointment(3, '2024-06-21', '15:00', 103, 203, 'Scheduled', 'Consultation'),
    ];
    setAppointments(staticAppointments);
  }, []);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDoctor(appointment.doctorId);
    setSelectedPatient(appointment.patientId);
    setDate(appointment.date);
    setTime(appointment.time);
    setStatus(appointment.status);
    setMedicalInfo(appointment.medicalInfo);
  };

  const handleSave = () => {
    if (selectedAppointment) {
      // Update existing appointment
      const updatedAppointments = appointments.map((appt) =>
        appt.id === selectedAppointment.id
          ? new Appointment(
              selectedAppointment.id,
              date,
              time,
              selectedDoctor,
              selectedPatient,
              status,
              medicalInfo
            )
          : appt
      );
      setAppointments(updatedAppointments);
      alert('Appointment updated successfully');
    } else {
      // Create new appointment
      const newAppointment = new Appointment(
        appointments.length + 1,
        date,
        time,
        selectedDoctor,
        selectedPatient,
        status,
        medicalInfo
      );
      setAppointments([...appointments, newAppointment]);
      alert('New appointment created successfully');
    }
    clearForm();
  };

  const handleClearForm = () => {
    clearForm();
  };

  const handleDelete = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.filter((appt) => appt.id !== selectedAppointment.id);
      setAppointments(updatedAppointments);
      alert('Appointment deleted successfully');
      clearForm();
    }
  };

  const clearForm = () => {
    setSelectedAppointment(null);
    setSelectedDoctor('');
    setSelectedPatient('');
    setDate('');
    setTime('');
    setStatus('');
    setMedicalInfo('');
  };

  return (
    <Box>
      <Typography variant="h4">Gestión de Citas</Typography>
      <Box display="flex" mt={2}>
        <Box flex={1}>
          <Typography variant="h5">Lista de Citas</Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {appointments.map((appointment) => (
              <ListItem
                button
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                selected={selectedAppointment && selectedAppointment.id === appointment.id}
              >
                <ListItemText
                  primary={`${appointment.date} ${appointment.time}`}
                  secondary={`Doctor: ${doctors.find((doc) => doc.id === appointment.doctorId)?.nombre}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box ml={2} maxWidth={700}>
          <Typography variant="h5">Detalles de la Cita</Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Paciente</InputLabel>
                <Select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {`${patient.nombre} ${patient.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Fecha"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                sx={{ mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Hora"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                sx={{ mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {['Scheduled', 'Completed', 'Missed', 'Cancelled', 'Rescheduled'].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Información Médica"
                value={medicalInfo}
                onChange={(e) => setMedicalInfo(e.target.value)}
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Guardar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClearForm}>
                  Limpiar
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentSchedule;
