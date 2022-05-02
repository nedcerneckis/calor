import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import Patients from './components/Patients/Patients';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Camera from './components/Camera/Camera';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

function PrivateOutlet() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/signin" />;
}

const App = () => {

  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateOutlet />} >
              <Route path="/" element={<Navbar />}>
                <Route index element={<Camera />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider >
  );
}

export default App;