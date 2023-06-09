import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleButton from 'react-google-button';
import axios from 'axios';
import AuthContext from '../AuthContext.jsx';

import {
  Box,
  Card,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { Google } from '@mui/icons-material';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    marginTop: '150px',
  },
  appBar: {
    zIndex: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  card: {
    backgroundColor: 'transparent',
    backdropFilter: 'blur(24px) brightness(125%)',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    textAlign: 'center',
  },
  input: {
    marginBottom: '16px',
  },
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleGoogleClick = () => {
    window.open(`http://localhost:3000/auth/google`, '_blank');
  };

  return (
    <Box sx={styles.root}>
      <AppBar position='fixed' sx={styles.appBar}>
        <Toolbar sx={styles.title}>
          <Button onClick={() => navigate('/')} sx={{ color: 'white' }}>
            Welcome!
          </Button>
        </Toolbar>
      </AppBar>
      <Card sx={styles.card}>
        <Typography
          variant='h5'
          sx={{
            mb: '16px',
            textAlign: 'center',
          }}
        >
          Login
        </Typography>
        <TextField
          required
          sx={styles.input}
          label='Username'
          variant='outlined'
          size='small'
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          sx={styles.input}
          label='Password'
          variant='outlined'
          size='small'
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button sx={{ margin: '15px' }} variant='contained' size='large'>
          Submit
        </Button>

        {/*      
        <a
          href='http://localhost:3000/auth/google'
          target='_self'
          rel='noopener noreferrer'
          style={{textDecoration: 'none'}}
        >
       */}

        <GoogleButton
          style={{ marginLeft: '70px' }}
          onClick={handleGoogleClick}
        >
          Sign in with Google
        </GoogleButton>

        {/* </a> */}

        <Typography
          sx={{
            mb: '16px',
            textAlign: 'center',
            marginTop: '25px',
          }}
        >
          Don't have an account?
        </Typography>
        <Button
          style={{ marginTop: '-20px' }}
          onClick={() => navigate('/signup')}
        >
          Sign up here
        </Button>
      </Card>
    </Box>
  );
}

export default Login;
