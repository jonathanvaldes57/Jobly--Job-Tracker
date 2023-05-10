import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Job from '../components/Job.jsx'
import axios from 'axios';
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
    overflowY: "scroll"
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
  const [jobs, setJobs] = useState({
    applied: [],
    interview: [],
    offer: [],
    rejected: [],
  });
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const response = axios
      .post('http://localhost:8080/job/getjobs', { user_id: '1' })
      .then((response) => {
        setJobs(response.data);
        console.log('this is data', response.data);
      })

      .catch((e) => console.log(e));
  }, [fetching]);

  return (
    <Box sx={styles.root}>
      <AppBar position='fixed' sx={styles.appBar}>
        <Toolbar sx={styles.title}>
          <Button onClick={() => navigate('/')} sx={{ color: 'white' }}>
            Welcome!
          </Button>
        </Toolbar>
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
           
            {jobs.applied?.map((job, index) => {
                return <Job job={job} key={index} />
              })}
             
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
            {jobs.interview?.map((job, index) => {
                return <Job job={job} key={index} />
              })}


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

            {jobs.offer?.map((job, index) => {
                return <Job job={job} key={index} />
              })}
        
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

            {jobs.rejected?.map((job, index) => {
                return <Job job={job} key={index} />
              })}
            
          </Grid>
        </Grid>
      </Box>
      <AddModal
        open={open}
        setOpen={setOpen}
        option={option}
        setOption={setOption}
        setFetching={setFetching}
        fetching={fetching}
      />
    </Box>
  );
};

export default Home;
