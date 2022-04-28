import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import Patients from './components/Patients/Patients';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '@aws-amplify/ui-react/styles.css';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import { Auth } from 'aws-amplify';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await Auth.currentAuthenticatedUser();
      setUser(response);
    }
    fetchUser();
  }, [])

  return { user };
}

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth);

  return (
    auth
      ? <Outlet/>
      : <Navigate to='/signin' state={{ from: location}} replace/>
  );
}

const App = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Navbar />}>
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
  );
}

export default App;