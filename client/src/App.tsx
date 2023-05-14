import { useMemo } from 'react';
import { themeSettings } from "./theme";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from "@/scenes/navbar"
import Dashboard from "@/scenes/dashboard"
// import { CssBaseline, ThemeProvider } from '@mui/material'

function App() {
const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box padding="1rem 2rem 4rem 2rem" width="100%" height="100%">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predications" element={<div>predications</div>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
