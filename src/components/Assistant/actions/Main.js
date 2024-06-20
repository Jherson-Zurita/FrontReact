import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Appointment from '../../../models/Appointment';

const staticAppointments = [
  new Appointment(1, '2024-06-18', '11:00', 101, 201, 'Scheduled', 'Checkup'),
  new Appointment(2, '2024-06-19', '13:00', 102, 202, 'Completed', 'Follow-up'),
  new Appointment(3, '2024-06-21', '15:00', 103, 203, 'Scheduled', 'Consultation'),
  // Añade más citas según sea necesario
];

function Main() {
  const [appointments, setAppointments] = useState([]);
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);

  useEffect(() => {
    setAppointments(staticAppointments);
    generateChartData(staticAppointments);
  }, []);

  const generateChartData = (appointments) => {
    const dailyCounts = {};
    const monthlyCounts = {};
    const yearlyCounts = {};

    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const day = appointmentDate.toISOString().split('T')[0];
      const month = appointmentDate.getMonth() + 1;
      const year = appointmentDate.getFullYear();

      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
      yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
    });

    setDailyData({
      labels: Object.keys(dailyCounts),
      datasets: [
        {
          label: 'Citas por Día',
          data: Object.values(dailyCounts),
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    });

    setMonthlyData({
      labels: Object.keys(monthlyCounts),
      datasets: [
        {
          label: 'Citas por Mes',
          data: Object.values(monthlyCounts),
          backgroundColor: 'rgba(153,102,255,0.6)',
        },
      ],
    });

    setYearlyData({
      labels: Object.keys(yearlyCounts),
      datasets: [
        {
          label: 'Citas por Año',
          data: Object.values(yearlyCounts),
          backgroundColor: 'rgba(255,159,64,0.6)',
        },
      ],
    });
  };

  return (
    <Box>
      <Typography variant="h4">Dashboard de Citas</Typography>
      <Box>
        <Typography variant="h6">Citas por Día</Typography>
        {dailyData ? <Bar data={dailyData} /> : <Typography variant="body2">Cargando datos...</Typography>}
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Citas por Mes</Typography>
        {monthlyData ? <Bar data={monthlyData} /> : <Typography variant="body2">Cargando datos...</Typography>}
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Citas por Año</Typography>
        {yearlyData ? <Bar data={yearlyData} /> : <Typography variant="body2">Cargando datos...</Typography>}
      </Box>
    </Box>
  );
}

export default Main;

