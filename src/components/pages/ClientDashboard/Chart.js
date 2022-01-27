import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Typography from '@mui/material/Typography';
import axios from "axios";
axios.defaults.withCredentials=true
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}



export default function Chart() {
  const theme = useTheme();
  const [name,setName] = useState()
   

  useEffect( () => 
  {
      axios.get("http://localhost:51153/api/Authenticate/User").then((response) => {
        setName(response.data);
      });
    }, []);
  
    if (!name) return null;
  return (
    <React.Fragment>
       <Title> Welcome {name.FirstName} The Assessment Tooling Application. </Title>
      <ResponsiveContainer>
        
         
         
          
      <Typography variant="h2" component="h3" align="center">
             
             
Schedule a Booking
            </Typography>
          
        
      </ResponsiveContainer>
    </React.Fragment>
  );
}