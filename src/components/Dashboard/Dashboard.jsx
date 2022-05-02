import { Card, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const Dashboard = () => {

  return (
    <Card sx={{ height: '85vh', width: '100%' }}>
      <CardContent sx={{ display: 'flex', height: '95%' }}>
        <Typography>
          Dashboard
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Dashboard;