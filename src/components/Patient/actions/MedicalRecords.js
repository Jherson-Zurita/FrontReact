import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader } from '@mui/material';

const doctors = [
  { name: 'Dr. Smith', specialty: 'Cardiology', details: 'Detalles adicionales sobre Dr. Smith' },
  { name: 'Dr. Johnson', specialty: 'Neurology', details: 'Detalles adicionales sobre Dr. Johnson' },
];

function MedicalRecords() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registros Médicos
      </Typography>
      <Grid container spacing={2}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardHeader title={doctor.name} subheader={doctor.specialty} />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {doctor.details}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default MedicalRecords;
