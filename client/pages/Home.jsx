import React from 'react';
import {
  Box,
  Card,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Typography,
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
    textAlign: 'left',
  },
  column: {
    height: '100vh',
    border: '1px solid #ccc',
    padding: '20px',
    boxSizing: 'border-box',
  },
};

const Home = () => {
  return (
    <Box sx={styles.root}>
      <AppBar position='fixed' sx={styles.appBar}>
        <Toolbar sx={styles.title}>Welcome!</Toolbar>
      </AppBar>
      <Grid container spacing={0} sx={{ width: '95%' }}>
        <Grid item xs={3} sx={styles.column}>
          <Box>
            <Typography>Hello</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={styles.column}>
          2
        </Grid>
        <Grid item xs={3} sx={styles.column}>
          3
        </Grid>
        <Grid item xs={3} sx={styles.column}>
          4
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
