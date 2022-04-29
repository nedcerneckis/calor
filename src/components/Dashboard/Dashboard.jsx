import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const Dashboard = () => {

  return (
    <Card sx={{ minWidth: 200, minHeight: 600 }}>
      <CardContent sx={{ alignItems: 'center' }}>
        <Typography>
          Dashboard
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Dashboard;