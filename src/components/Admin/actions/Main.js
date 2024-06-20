import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'User Registrations',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function Main() {
  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">User Registrations</Typography>
            <Bar data={data} options={options} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">System Health</Typography>
            {/* Placeholder for another chart or statistic */}
            <Box mt={2}>
              <Typography variant="body1">Everything is running smoothly.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <Box mt={2}>
                <Typography variant="body1">User John Doe created a new appointment.</Typography>
                <Typography variant="body1">User Jane Smith updated her profile.</Typography>
                {/* More recent activity items */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">Generate Report</Button>
      </Box>
    </Box>
  );
}

export default Main;
