import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                <img src={logo} className="App-logo" alt="logo" />
                CALOR
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Patients
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Reports
            </Typography>
          <Button variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}

export default Navbar;