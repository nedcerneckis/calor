import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import Patients from './components/Patients/Patients';
import Camera from './components/Camera/Camera';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import { Authenticator } from '@aws-amplify/ui-react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user}) => (
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Camera />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      )}
    </Authenticator>
  );
}

export default App;