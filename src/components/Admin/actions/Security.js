import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Example roles data
const rolesData = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Doctor' },
  { id: 3, name: 'Patient' },
  { id: 4, name: 'Assistant' },
];

function Security() {
  const [selectedRole, setSelectedRole] = useState('');
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [newRole, setNewRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handleOpenAddRole = () => {
    setOpenAddRole(true);
  };

  const handleCloseAddRole = () => {
    setOpenAddRole(false);
  };

  const handleAddRole = () => {
    // Logic to add new role
    rolesData.push({ id: rolesData.length + 1, name: newRole });
    setNewRole('');
    handleCloseAddRole();
  };

  const handleChangePassword = () => {
    // Logic to change password
    handleCloseChangePassword();
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Security Management
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Manage Roles</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select value={selectedRole} onChange={handleRoleChange}>
                {rolesData.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpenAddRole}>
              Add New Role
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Change Password</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleOpenChangePassword}>
              Change Password
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for adding new role */}
      <Dialog open={openAddRole} onClose={handleCloseAddRole}>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new role.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddRole} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRole} color="primary">
            Add Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for changing password */}
      <Dialog open={openChangePassword} onClose={handleCloseChangePassword}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassword} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Security;
