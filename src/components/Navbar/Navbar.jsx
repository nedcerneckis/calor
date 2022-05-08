import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import InsertChartSharpIcon from '@mui/icons-material/InsertChartSharp';
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import LoginIcon from '@mui/icons-material/Login';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';
import { useAuth } from '../AuthContext';

const drawerWidth = 300;

const Navbar = () => {

  const navigate = useNavigate();
  const auth = useAuth();

  const signOutUser = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
            CALOR
          </Typography>
          {auth?.user ?
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            Welcome, <b>{auth?.user.attributes['custom:firstName']} {auth?.user.attributes['custom:lastName']}</b>.
          </Typography>
          : null
          }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem 
            component={Link}
            to="/"
            disablePadding
            style={{ color: 'inherit', textDecoration: 'inherit'}}
          >
            <ListItemButton>
              <ListItemIcon>
                <PlayCircleFilledIcon />
              </ListItemIcon>
              <ListItemText primary="Start Session" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem 
            component={Link} 
            to="/patients" 
            disablePadding
            style={{ color: 'inherit', textDecoration: 'inherit'}}
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonSearchSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </ListItem>
          <ListItem 
            component={Link} 
            to="/reports" 
            disablePadding
            style={{ color: 'inherit', textDecoration: 'inherit'}}
          >
            <ListItemButton>
              <ListItemIcon>
                <InsertChartSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem 
            onClick={signOutUser}
            disablePadding
            style={{ color: 'inherit', textDecoration: 'inherit'}}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;