import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import Patients from './components/Patients/Patients';
import Camera from './components/Camera/Camera';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={user ? (<Camera />) : (<Navigate to="/signin"/>)}/>
              <Route path="dashboard" element={user ? (<Dashboard />) : (<Navigate to="/signin"/>)}/>
              <Route path="patients" element={user ? (<Patients />) : (<Navigate to="/signin"/>)} />
              <Route path="reports" element={user ? (<Reports />) : (<Navigate to="/signin"/>)} />
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;