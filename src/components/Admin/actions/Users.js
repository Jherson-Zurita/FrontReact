import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Doctor from '../../../models/Doctor';
import Patient from '../../../models/Patient';
import Assistant from '../../../models/Assistant';

const initialUsers = {
  Patient: [
    new Patient(1, 'John', 'Doe', '1980-01-01', '123 Main St', '555-5555', 'john@example.com', 101),
    new Patient(2, 'Jane', 'Smith', '1990-02-02', '456 Elm St', '555-1234', 'jane@example.com', 102),
  ],
  Doctor: [
    new Doctor(101, 'Dr. Smith', 'Doe', 'Cardiologist', '555-1234', 'smith@example.com'),
    new Doctor(102, 'Dr. Johnson', 'Doe', 'Neurologist', '555-5678', 'johnson@example.com'),
  ],
  Assistant: [
    new Assistant(101, 'Carol', 'Marist', '555-1234', 'carol@example.com'),
  ],
};

function Users() {
  const [userType, setUserType] = useState('Patient');
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', lastName: '', email: '', phone: '', specialty: '' });

  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleEditUser = () => {
    const updatedUsers = {
      ...users,
      [userType]: users[userType].map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      ),
    };
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = {
      ...users,
      [userType]: users[userType].filter((user) => user.id !== userId),
    };
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = () => {
    const newUserData = {
      ...newUser,
      id: users[userType].length + 1,
    };
    
    let updatedUsers = { ...users };
    if (userType === 'Doctor') {
      updatedUsers = {
        ...users,
        Doctor: [
          ...users.Doctor,
          new Doctor(newUserData.id, newUserData.nombre, newUserData.apellido, newUserData.especialidad, newUserData.telefono, newUserData.email),
        ],
      };
    } else if (userType === 'Patient') {
      updatedUsers = {
        ...users,
        Patient: [
          ...users.Patient,
          new Patient(newUserData.id, newUserData.nombre, newUserData.apellido, newUserData.fechanacimiento, newUserData.direccion, newUserData.telefono, newUserData.email, newUserData.idHistoryMedic),
        ],
      };
    } else if (userType === 'Assistant') {
      updatedUsers = {
        ...users,
        Assistant: [
          ...users.Assistant,
          new Assistant(newUserData.id, newUserData.nombre, newUserData.apellido, newUserData.telefono, newUserData.email),
        ],
      };
    }

    setUsers(updatedUsers);
    setNewUser({ nombre: '', apellido: '', email: '', telefono: '', especialidad: '' });
    handleClose();
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Manage Users
      </Typography>
      <Tabs value={userType} onChange={handleTabChange} centered>
        <Tab label="Patients" value="Patient" />
        <Tab label="Doctors" value="Doctor" />
        <Tab label="Assistants" value="Assistant" />
      </Tabs>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">{userType}s</Typography>
            {users[userType].map((user) => (
              <Card
                key={user.id}
                sx={{ mt: 2, cursor: 'pointer' }}
                onClick={() => handleUserClick(user)}
              >
                <CardContent>
                  <Typography variant="body1">{user.nombre} {user.apellido}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </CardContent>
              </Card>
            ))}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
              Add New {userType}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedUser && (
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Edit {userType}</Typography>
              <TextField
                fullWidth
                label="Name"
                value={selectedUser.nombre}
                onChange={(e) => setSelectedUser({ ...selectedUser, nombre: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={selectedUser.apellido}
                onChange={(e) => setSelectedUser({ ...selectedUser, apellido: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={selectedUser.telefono}
                onChange={(e) => setSelectedUser({ ...selectedUser, telefono: e.target.value })}
                sx={{ mt: 2 }}
              />
              {userType === 'Doctor' && (
                <TextField
                  fullWidth
                  label="Specialty"
                  value={selectedUser.especialidad}
                  onChange={(e) => setSelectedUser({ ...selectedUser, especialidad: e.target.value })}
                  sx={{ mt: 2 }}
                />
              )}
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleEditUser}>
                  Save Changes
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(selectedUser.id)} sx={{ ml: 2 }}>
                  Delete {userType}
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New {userType}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new {userType}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newUser.nombre}
            onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={newUser.apellido}
            onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={newUser.telefono}
            onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
          />
          {userType === 'Doctor' && (
            <TextField
              margin="dense"
              label="Specialty"
              fullWidth
              value={newUser.especialidad}
              onChange={(e) => setNewUser({ ...newUser, especialidad: e.target.value })}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add {userType}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Users;
