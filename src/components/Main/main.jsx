import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import Grid from '@mui/material/Grid';

import "./main.css";
import Cards from './Cards/cards';

const color = deepPurple[900];


export default function BoxSx() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
      setData(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        paddingBottom: '5%',
        // position: 'fixed',
        backgroundColor: color,
      }}
    >
      <Typography
        variant="h2" component="div" gutterBottom
        sx={{
          color: 'white',
        }}
      >
        Total Astronauts in Space: {data && data.number}
      </Typography>
      <Grid rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={10} md={6}>
          <Cards />
        </Grid>
      </Grid>
    </Box>
  );
}
