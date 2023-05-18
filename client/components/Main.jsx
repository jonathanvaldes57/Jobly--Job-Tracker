import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    Grid,
    AppBar,
    Toolbar,
    Paper,
    Typography,
    Button
  } from '@mui/material';

  const styles = {
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    appBar: {
      zIndex: 1,
    },
    title: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: "space-between"
    },
  };

function Main(){
  const navigate = useNavigate();
    return (
        <Box sx={styles.root}>
            <AppBar position='fixed' sx={styles.appBar}>
                <Toolbar sx={styles.title}>
                    <Button onClick={() => navigate('/')} sx={{ color: 'white' }}>
                     Welcome!
                    </Button>
                    <Button onClick={() => navigate('/login')} sx={{color: 'white'}}>login</Button>
                </Toolbar>
            </AppBar>
            <p style={{marginTop: '100px'}}>this is the landing page</p>
        </Box>
    )
}

export default Main;