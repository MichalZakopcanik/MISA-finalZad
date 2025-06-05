import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ position: 'absolute', top: 10, right: 20 }}>
          <IconButton onClick={() => setDarkMode((prev) => !prev)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
