import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, TextField } from '@mui/material';
import Doctor from '../../../models/Doctor';

const initialDoctor = new Doctor(null, '', '', '', '', '', '');

function MedicHistory() {
  const [doctors, setDoctors] = useState([
    new Doctor(101, 'Dr. Smith','Smith', 'Cardiologist', '555-1234', 'smith@example.com'),
    new Doctor(102, 'Dr. Johnson','Johnson', 'Neurologist', '555-5678', 'johnson@example.com'),
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSave = () => {
    if (selectedDoctor.id) {
      // Update existing doctor
      const updatedDoctors = doctors.map((doc) =>
        doc.id === selectedDoctor.id ? selectedDoctor : doc
      );
      setDoctors(updatedDoctors);
      alert('Doctor updated successfully');
    } else {
      // Create new doctor
      const newId = doctors.length > 0 ? doctors[doctors.length - 1].id + 1 : 1;
      const newDoctor = new Doctor(newId, selectedDoctor.nombre, selectedDoctor.especialidad, selectedDoctor.telefono, selectedDoctor.email);
      setDoctors([...doctors, newDoctor]);
      alert('New doctor created successfully');
    }
    clearForm();
  };

  const handleClearForm = () => {
    clearForm();
  };

  const handleDelete = () => {
    if (selectedDoctor.id) {
      const updatedDoctors = doctors.filter((doc) => doc.id !== selectedDoctor.id);
      setDoctors(updatedDoctors);
      alert('Doctor deleted successfully');
      clearForm();
    }
  };

  const clearForm = () => {
    setSelectedDoctor(initialDoctor);
  };

  return (
    <Box>
      <Typography variant="h4">Historial de Médicos</Typography>
      <Box display="flex" mt={2} >
        <Box flex={1} minWidth={200}>
          <Typography variant="h5">Lista de Médicos</Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {doctors.map((doctor) => (
              <ListItem
                button
                key={doctor.id}
                onClick={() => handleDoctorClick(doctor)}
                selected={selectedDoctor.id === doctor.id}
              >
                <ListItemText primary={`${doctor.nombre}`} secondary={`${doctor.especialidad}`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box ml={2} maxWidth={700}>
          <Typography variant="h5">Detalles del Médico</Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <TextField
                fullWidth
                label="Nombre"
                value={selectedDoctor.nombre}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, nombre: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Apellido"
                value={selectedDoctor.apellido}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, apellido: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Especialidad"
                value={selectedDoctor.especialidad}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, especialidad: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Teléfono"
                value={selectedDoctor.telefono}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, telefono: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedDoctor.email}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, email: e.target.value })}
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

export default MedicHistory;
