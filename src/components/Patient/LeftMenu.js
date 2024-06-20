import React from 'react';
import { List, ListItem, ListItemText, Avatar, Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function LeftMenu({ onMenuClick }) {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100vh', boxShadow: 3 , borderRadius: 3}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 100, height: 100 }}>U</Avatar>
        <Typography variant="h6" sx={{ mt: 2 }}>John Doe</Typography>
      </Box>
      <List>
        <ListItem button onClick={() => onMenuClick('main')}>
          <HomeIcon sx={{ mr: 2 }} />
          <ListItemText primary="Principal" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('new-appointment')}>
          <EventIcon sx={{ mr: 2 }} />
          <ListItemText primary="Nueva Cita" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('appointment-history')}>
          <AssignmentIcon sx={{ mr: 2 }} />
          <ListItemText primary="Registro de Citas" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('notifications')}>
          <NotificationsIcon sx={{ mr: 2 }} />
          <ListItemText primary="Notificaciones" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('medical-records')}>
          <MedicalServicesIcon sx={{ mr: 2 }} />
          <ListItemText primary="Registros Médicos" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('logout')}>
          <ExitToAppIcon sx={{ mr: 2 }} />
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Box>
  );
}

export default LeftMenu;
