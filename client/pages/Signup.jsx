import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    Grid,
    AppBar,
    Toolbar,
    Paper,
    Typography,
    Button,
    TextField
  } from '@mui/material';

  const styles = {
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      marginTop: '150px'
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
        textAlign: 'center'
      },
      input: {
        marginBottom: '16px',
      },
  };

function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        //fetch request here
    }

    return(
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
                }}>
                Create Account
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
              <Button variant='contained' size='large' onClick={handleClick}>
                  Submit
                </Button>
            </Card>
        </Box>
    )

}

export default Signup;