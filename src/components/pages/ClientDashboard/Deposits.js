import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
    const date =new Date();
  return (
    <React.Fragment>
      <Title>Total Number of Bookings</Title>
      <Typography component="p" variant="h4">
        100
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      {date.toLocaleTimeString('en-US')}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}