import { Box, Container, CssBaseline, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
import logo from '../../logo.svg';

const NotFound = () => {
    const location = useLocation();

    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} className="App-logo" alt="logo" />
          CALOR
        </Typography>
        <Typography variant="h1" noWrap component="div" sx={{ flexGrow: 1, mt:5 }}>
            404
            </Typography>
        <Typography variant="overline" noWrap component="div" sx={{ flexGrow: 1, fontSize: 16 }}>
            Not Found
        </Typography>
        <Typography variant="caption" noWrap component="div" sx={{ flexGrow:1, mt:6, fontSize: 16 }}>
            The requested resource <b>{location.pathname}</b> was not found on this server.
        </Typography>
      </Box>
    </Container>
    )
}

export default NotFound