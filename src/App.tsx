import React, { useEffect, useState } from 'react';
import ThemeButton from './components/ToggleTheme';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LastMatches from './pages/LastMatches';
import Footer from './components/Footer';
import AuthSuccess from './pages/Auth';
import { Container, Flex, LoadingOverlay } from '@mantine/core'; // Import Mantine Flex
import NotFoundPage from './pages/404';
import { MatchStat } from './utils/types';
import ErrorElement from './components/ErrorElement';
import GlobalStats from './pages/GlobalStats';

const App: React.FC = () => {
  const [matches, setRecentMatches] = useState<MatchStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    const fetchMatchStats = async () => {
      try {
        const response: any = await fetch('/api/getMatches');

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.success) setRecentMatches(data.data);
      } catch (error: any) {
        setErrorMessage(`${error.response.status} - ${JSON.stringify(error.response.data)}` || 'Raison inconnue');
        console.error('Error fetching match stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchStats();
  }, []);

  return (
    <Router>
      <Flex direction="column" style={{ minHeight: '100vh' }}>
        <Navbar />
        <ThemeButton />
        <LoadingOverlay visible={loading} zIndex={100} overlayProps={{ radius: "sm", blur: 2 }} />

        {
          errMessage && <ErrorElement message={errMessage} />
        }

        <Container fluid style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LastMatches matches={matches} />} />
            <Route path="/globalstats" element={<GlobalStats matches={matches} />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>

        <Footer />
      </Flex>
    </Router>
  );
};

export default App;
