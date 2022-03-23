import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import Patients from './components/Patients/Patients';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  props: {
    Link: {
      underline: "none"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;