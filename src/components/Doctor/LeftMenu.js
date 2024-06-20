import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function LeftMenu({ onMenuClick }) {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 3, height: '100vh', }}>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Avatar alt="Doctor Avatar" src="/path-to-avatar.jpg" sx={{ width: 56, height: 56 }} />
        <Typography variant="h6" mt={1}>
          Doctor Name
        </Typography>
      </Box>
      <List>
        <ListItem button onClick={() => onMenuClick('main')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Principal" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('appointment_edit')}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Editar Citas" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('pacient-history')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Historial de Pacientes" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('logout')}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Box>
  );
}

export default LeftMenu;

