import React from 'react';
import ThemeButton from './components/ToggleTheme';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LastMatches from './pages/LastMatches';
import Footer from './components/Footer';
import AuthSuccess from './pages/Auth';

const App: React.FC = () => {

  return (<>
    <Router>
      <Navbar />
      <ThemeButton />
      <Routes>
        <Route path="/" element={<LastMatches />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
      </Routes>
      <Footer />
    </Router>
  </>);
}

export default App;
