import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../ClientDashboard/Title';
import axios from "axios";
import { height } from '@mui/system';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
axios.defaults.withCredentials=true

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {


    
  return { id, date, name, shipTo, paymentMethod, amount };
}




function preventDefault(event) {
  event.preventDefault();
}

export default function Records() {

    const [records, setRecords] = useState([])
    useEffect( () => 
    { //used axios
        axios.get("http://localhost:51153/api/AssessmentBooking").then(json => 
        setRecords(json.data)) 
      }, []);

  return (
    <Paper >
      <Title>Pending Bookings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>contactNo</TableCell>
            <TableCell>RetailerName</TableCell>
            <TableCell>Province</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.Email}</TableCell>
              <TableCell>{row.contactNo}</TableCell>
              <TableCell>{row.RetailerName}</TableCell>
              <TableCell>{row.Province}</TableCell>
              <TableCell>{row.ShortListedPosition}</TableCell>
              <TableCell align="right">{row.PreferredDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </Paper>
  );
}