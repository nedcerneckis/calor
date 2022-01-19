import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Camera from './components/Camera/Camera';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Camera />
    </ThemeProvider>
  );
}

export default App;