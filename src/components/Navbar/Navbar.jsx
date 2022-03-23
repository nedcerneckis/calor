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
import ListItemText from '@mui/material/ListItemText';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import InsertChartSharpIcon from '@mui/icons-material/InsertChartSharp';
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg';

const drawerWidth = 300;

const Navbar = () => {
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PlayCircleFilledIcon />
              </ListItemIcon>
              <ListItemText primary="Start Session" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/dashboard" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GridViewSharpIcon />
              </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/patients" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonSearchSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/reports" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InsertChartSharpIcon />
              </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Stop looking at my screen Diarmuid.🤪
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

export default Navbar;