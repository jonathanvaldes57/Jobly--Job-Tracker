import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddModal from '../components/AddModal.jsx';
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
    height: 'calc(98vh - 64px)',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  container: {
    marginTop: '58px',
    width: '90%',
  },
  card: {
    width: '100%',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');
  return (
    <Box sx={styles.root}>
      <AppBar position='fixed' sx={styles.appBar}>
        <Toolbar sx={styles.title}>Welcome!</Toolbar>
      </AppBar>
      <Box sx={styles.container}>
        <Grid container spacing={0}>
          <Grid item xs={3} sx={styles.column}>
            <Card sx={styles.card}>
              <Typography
                variant='h5'
                sx={{ textAlign: 'center', p: '10px', pb: '5px' }}
              >
                Applied
              </Typography>
              <Button
                onClick={() => {
                  setOption('applied');
                  setOpen(true);
                }}
              >
                <AddIcon />
              </Button>
            </Card>
          </Grid>
          <Grid item xs={3} sx={styles.column}>
            <Card sx={styles.card}>
              <Typography
                variant='h5'
                sx={{ textAlign: 'center', p: '10px', pb: '5px' }}
              >
                Interview
              </Typography>
              <Button
                onClick={() => {
                  setOption('interview');
                  setOpen(true);
                }}
              >
                <AddIcon />
              </Button>
            </Card>
          </Grid>
          <Grid item xs={3} sx={styles.column}>
            <Card sx={styles.card}>
              <Typography
                variant='h5'
                sx={{ textAlign: 'center', p: '10px', pb: '5px' }}
              >
                Offer
              </Typography>
              <Button
                onClick={() => {
                  setOption('offer');
                  setOpen(true);
                }}
              >
                <AddIcon />
              </Button>
            </Card>
          </Grid>
          <Grid item xs={3} sx={styles.column}>
            <Card sx={styles.card}>
              <Typography
                variant='h5'
                sx={{ textAlign: 'center', p: '10px', pb: '5px' }}
              >
                Rejected
              </Typography>
              <Button
                onClick={() => {
                  setOption('rejected');
                  setOpen(true);
                }}
              >
                <AddIcon />
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <AddModal open={open} setOpen={setOpen} option={option} setOption={setOption}/>
    </Box>
  );
};

export default Home;
