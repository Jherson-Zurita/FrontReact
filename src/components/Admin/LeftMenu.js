import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';

function LeftMenu({ onMenuClick }) {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 3, height: '100vh' }}>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Avatar alt="Doctor Avatar" src="/path-to-avatar.jpg" sx={{ width: 56, height: 56 }} />
        <Typography variant="h6" mt={1}>
          Nombre del Admin
        </Typography>
      </Box>
      <List>
        <ListItem button onClick={() => onMenuClick('main')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Principal" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('users')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Gestion de Usuarios" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('segurity')}>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Security" />
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


