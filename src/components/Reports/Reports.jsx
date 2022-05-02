import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const Reports = () => {

  return (
    <Card sx={{ height: '85vh', width: '100%' }}>
      <CardContent sx={{ display: 'flex', height: '95%' }}>
        <Typography>
          Reports
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Reports;