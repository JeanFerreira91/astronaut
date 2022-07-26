import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';
import "./cards.css";

export default function OutlinedCard() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result.people);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="cards-person">
        {items.map(item => (
          <Box sx={{ 
            minWidth: 275,
          }}
          className="cards-person-box"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Astronaut:
                  </Typography>
                  <Typography variant="h5" component="div">
                    <a target="_blank" rel="noreferrer" href={"https://www.wikipedia.org/wiki/" + item.name}>{item.name}</a>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Craft:
                  </Typography>
                  <Typography variant="body2">
                    {item.craft}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        ))}
      </div>
    );
  }

  // return (
      // <Box sx={{ 
      //   minWidth: 275,
      // }}
      // >
      //   <motion.div
      //     whileHover={{ scale: 1.05 }}
      //     whileTap={{ scale: 0.95 }}
      //   >
      //     <Card variant="outlined">
  
      //       <CardContent>
      //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      //           Astronaut:
      //         </Typography>
      //         <Typography variant="h5" component="div">
      //           astronaut_name
      //         </Typography>
      //         <Typography sx={{ mb: 1.5 }} color="text.secondary">
      //           Craft:
      //         </Typography>
      //         <Typography variant="body2">
      //           craft_name
      //         </Typography>
      //       </CardContent>
      //       <CardActions>
      //         <Button size="small">Learn More</Button>
      //       </CardActions>
  
      //     </Card>
      //   </motion.div>
      // </Box>
  // );
}
