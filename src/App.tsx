import React from 'react';
import ThemeButton from './components/ToggleTheme';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LastMatches from './pages/LastMatches';
import Footer from './components/Footer';
import AuthSuccess from './pages/Auth';
import { Container, Flex } from '@mantine/core'; // Import Mantine Flex

const App: React.FC = () => {
  return (
    <Router>
      <Flex direction="column" style={{ minHeight: '100vh' }}>
        <Navbar />
        <ThemeButton />

        <Container fluid style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LastMatches />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
          </Routes>
        </Container>

        <Footer />
      </Flex>
    </Router>
  );
};

export default App;
