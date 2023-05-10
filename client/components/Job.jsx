import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardHeader,
  Typography,
  IconButton,
  Modal,
  Box,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

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

  
const Job = ({ job }) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleCancel = () => setOpen(false)
    const handleSubmit = () => console.log('submit')
    const [interest_level, setInterest_level] = useState(job.interest_level);
    const [status, setStatus] = useState(job.status);
    const [company_name, setCompanyName] = useState(job.company_name);
    const [job_title, setJob_Title] = useState(job.job_title);
    const [url, setUrl] = useState(job.url);
    const [description, setDescription] = useState(job.description)

  return ( 
    <Card sx={{ boxShadow: 3, height: "110px", margin: '10px' }}>
      <CardHeader
        title={job.company_name}
        subheader={job.job_title}
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon onClick={() => setOpen(true)}/>
          </IconButton>
        }
      />
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
                Edit Job
              </Typography>
              <TextField
                required
                sx={styles.input}
                label='Company Name'
                variant='outlined'
                size='small'
                value={company_name}
                fullWidth
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextField
                required
                sx={styles.input}
                label='Job Title'
                variant='outlined'
                value={job_title}
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
                value={url}
                onChange={(e) => setLink(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel sx={{ marginTop: '-5px' }}>
                  Interest Level
                </InputLabel>
                <Select
                  required
                  sx={styles.input}
                  value={interest_level}
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
                  value={status}
                  label='Status'
                  size='small'
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={'applied'}>Applied</MenuItem>
                  <MenuItem value={'interview'}>Interview</MenuItem>
                  <MenuItem value={'offer'}>Offer</MenuItem>
                  <MenuItem value={'rejected'}>Rejected</MenuItem>
                </Select>
              </FormControl>
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
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Card>
    
  );
};

export default Job;
