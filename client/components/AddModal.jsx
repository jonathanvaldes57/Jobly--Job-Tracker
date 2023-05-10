import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import {
  Card,
  CardContent,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
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
  },
  input: {
    marginBottom: '16px',
  },
  submitButton: {
    marginTop: '16px',
    marginBottom: '8px',
    backgroundColor: '#227BA5',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1D6490',
    },
  },
  signupLink: {
    color: '##227BA5',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
  },
};

export default function BasicModal({
  open,
  setOpen,
  option,
  setOption,
  setFetching,
  fetching,
}) {
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [interest, setInterest] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleCancel = () => {
    setOpen(false);
    setCompany('');
    setJobTitle('');
    setInterest('');
    setLink('');
    setDescription('');
  };

  const handleSubmit = async () => {
    if (!company || !jobTitle || !interest || !link || !option) {
      return;
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8080/job/createjob',
          {
            company_name: company,
            job_title: jobTitle,
            interest_level: interest,
            status: option,
            url: link,
            date: date,
            description: description,
            users_id: 1,
          }
        );
      } catch (err) {
        console.log('error in post to createjob', err);
      }
      setOpen(false);
      setCompany('');
      setJobTitle('');
      setInterest('');
      setLink('');
      setDescription('');
      setFetching(!fetching);
    }
  };


  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styles.root}>
          <Card sx={styles.card}>
            <CardContent>
              <Typography
                variant='h5'
                sx={{
                  mb: '16px',
                  textAlign: 'center',
                }}
              >
                Enter Job Information
              </Typography>
              <TextField
                required
                sx={styles.input}
                label='Company Name'
                variant='outlined'
                size='small'
                fullWidth
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextField
                required
                sx={styles.input}
                label='Job Title'
                variant='outlined'
                size='small'
                fullWidth
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <TextField
                required
                sx={styles.input}
                label='Link'
                variant='outlined'
                size='small'
                fullWidth
                onChange={(e) => setLink(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel sx={{ marginTop: '-5px' }}>
                  Interest Level
                </InputLabel>
                <Select
                  required
                  sx={styles.input}
                  value={interest}
                  label='Interest Level'
                  size='small'
                  onChange={(e) => setInterest(e.target.value)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel sx={{ marginTop: '-5px' }}>Status</InputLabel>
                <Select
                  sx={styles.input}
                  value={option}
                  label='Status'
                  size='small'
                  onChange={(e) => setOption(e.target.value)}
                >
                  <MenuItem value={'applied'}>Applied</MenuItem>
                  <MenuItem value={'interview'}>Interview</MenuItem>
                  <MenuItem value={'offer'}>Offer</MenuItem>
                  <MenuItem value={'rejected'}>Rejected</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label='Basic date field'
                  sx={{ marginBottom: '10px' }}
                  onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
                />
              </LocalizationProvider>

              <TextField
                required
                sx={styles.input}
                label='Description'
                variant='outlined'
                size='small'
                multiline
                fullWidth
                value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: '10px',
                }}
              >
                <Button
                  variant='outlined'
                  size='large'
                  onClick={handleCancel}
                  color='error'
                >
                  Cancel
                </Button>
                <Button variant='contained' size='large' onClick={handleSubmit}>
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
