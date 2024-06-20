import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Switch, Grid, Link as MuiLink, TextField, Button, Typography, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import bgImage from '../assets/images/fondo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías validar el usuario con una API o datos estáticos
    if (email === 'admin@example.com' && password === 'admin123') {
      navigate('/admin');
    } else if (email === 'doctor@example.com' && password === 'doctor123') {
      navigate('/doctor');
    } else if (email === 'patient@example.com' && password === 'patient123') {
      navigate('/patient');
    } else if (email === 'assistant@example.com' && password === 'assistant123') {
      navigate('/assistant');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <Card sx={{ p: 3, width: '100%', maxWidth: 300 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          mb={2}
        >
          <Typography variant="h4" fontWeight="medium" color="primary" mb={2}>
            Sign in
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <MuiLink href="#">
                <FacebookIcon color="primary" />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink href="#">
                <GitHubIcon color="primary" />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink href="#">
                <GoogleIcon color="primary" />
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <Typography
              variant="body2"
              color="textSecondary"
              onClick={handleSetRememberMe}
              sx={{ cursor: 'pointer', ml: 1 }}
            >
              Remember me
            </Typography>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign in
          </Button>
        </form>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
            <MuiLink component="button" variant="body2" color="primary">
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;


