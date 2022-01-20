import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import Patients from './components/Patients/Patients';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboards" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;