import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const Reports = () => {

  return (
    <Card sx={{ minWidth: 200, minHeight: 600 }}>
      <CardContent sx={{ alignItems: 'center' }}>
        <Typography>
          Reports
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Reports;