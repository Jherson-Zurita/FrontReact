import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, TextField, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Patient from '../../../models/Patient';
import HistoryMedic from '../../../models/HistoryMedic';

const patientsData = [
  new Patient(1, 'John', 'Doe', '1980-01-01', '123 Main St', '555-5555', 'john@example.com', 101),
  new Patient(2, 'Jane', 'Smith', '1990-02-02', '456 Elm St', '555-1234', 'jane@example.com', 102),
];

const historyMedicData = [
  new HistoryMedic(101, 1, 'Paciente con buena salud general.', '2024-06-01'),
  new HistoryMedic(103, 1, 'Paciente con casi salud general.', '2024-06-05'),
  new HistoryMedic(102, 2, 'Paciente con historial de alergias.', '2024-06-02'),
];

function PatientHistory() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);
  const [newHistory, setNewHistory] = useState('');

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setSelectedHistoryIndex(0);
  };

  const handleNextHistory = () => {
    if (selectedPatient) {
      const historyList = getHistoryForPatient(selectedPatient.id);
      if (selectedHistoryIndex < historyList.length - 1) {
        setSelectedHistoryIndex(selectedHistoryIndex + 1);
      }
    }
  };

  const handlePreviousHistory = () => {
    if (selectedPatient && selectedHistoryIndex > 0) {
      setSelectedHistoryIndex(selectedHistoryIndex - 1);
    }
  };

  const handleAddHistory = () => {
    if (selectedPatient && newHistory) {
      const newId = historyMedicData.length + 1;
      const newHistoryEntry = new HistoryMedic(newId, selectedPatient.id, newHistory, new Date().toISOString().split('T')[0]);
      historyMedicData.push(newHistoryEntry);
      setNewHistory('');
      setSelectedHistoryIndex(getHistoryForPatient(selectedPatient.id).length - 1);
    }
  };

  const handleHistoryChange = (event) => {
    setNewHistory(event.target.value);
  };

  const getHistoryForPatient = (patientId) => {
    return historyMedicData.filter((history) => history.idPatient === patientId);
  };

  const currentHistory = selectedPatient ? getHistoryForPatient(selectedPatient.id)[selectedHistoryIndex] : null;

  return (
    <Box display="flex">
      <Box flex={1}>
        <Typography variant="h4">Historial de Pacientes</Typography>
        <List>
          {patientsData.map((patient) => (
            <ListItem button key={patient.id} onClick={() => handlePatientClick(patient)}>
              <ListItemText primary={`${patient.name} ${patient.apellido}`} secondary={patient.email} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex={2} ml={4}>
        {selectedPatient ? (
          <>
            <Typography variant="h5">{`Historial Médico de ${selectedPatient.name} ${selectedPatient.apellido}`}</Typography>
            {currentHistory && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="body1">{`Fecha: ${currentHistory.fecha}`}</Typography>
                  <Typography variant="body2">{currentHistory.notas}</Typography>
                </CardContent>
              </Card>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <IconButton onClick={handlePreviousHistory} disabled={selectedHistoryIndex === 0}>
                <ArrowBackIcon />
              </IconButton>
              <Typography>{`Historial ${selectedHistoryIndex + 1} de ${getHistoryForPatient(selectedPatient.id).length}`}</Typography>
              <IconButton onClick={handleNextHistory} disabled={selectedHistoryIndex === getHistoryForPatient(selectedPatient.id).length - 1}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
            <Box mt={4}>
              <Typography variant="h6">Agregar Nuevo Historial Médico</Typography>
              <TextField
                fullWidth
                label="Notas"
                value={newHistory}
                onChange={handleHistoryChange}
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddHistory}>
                Agregar Historial
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h5">Seleccione un paciente para ver su historial médico</Typography>
        )}
      </Box>
    </Box>
  );
}

export default PatientHistory;

