import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Box} from '@mui/material';

const styles = {
    column: {
        border: "1px solid black",
        width: "350px",
        minHeight: "400px",
        textAlign: 'center',
        padding: '10px',
    },
}

function Main(){
    return (
        <div>
            <h>This is the main page</h>
            <Box sx={{display: 'flex', justifyContent: 'center', padding: '15px'}}>
                <Box sx={styles.column}>Applied</Box>
                <Box sx={styles.column}>Interview</Box>
                <Box sx={styles.column}>Offer</Box>
                <Box sx={styles.column}>Rejected</Box>
            </Box>
        </div>
    )
}

export default Main;