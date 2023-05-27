import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { Container, ThemeProvider } from '@mui/system';

import { useIncidentsSocket } from '../hooks/useIncidentsSocket';
import { globalStyles, theme } from '../theme';
import { Navbar } from '../components/navbar/Navbar';
import Snackbar from '../components/snackbar/Snackbar';
import Home from '../pages/home';
import Map from '../pages/map';

const StyledContainer = styled(Container)({
  position: 'relative',
  padding: 0,
  height: '100%',
});

const queryClient = new QueryClient();

export function App() {
  useIncidentsSocket();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <StyledContainer disableGutters>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
          </Routes>
          <Snackbar />
        </StyledContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
