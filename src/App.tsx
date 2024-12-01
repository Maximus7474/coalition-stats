import React from 'react';
import ThemeButton from './components/ToggleTheme';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LastMatches from './pages/LastMatches';
import Footer from './components/Footer';

const App: React.FC = () => {

  


  return (<>
    <Router>
      <Navbar />
      <ThemeButton />
      <Routes>
        <Route path="/" element={<LastMatches />} />
      </Routes>
      <Footer />
    </Router>
  </>);
}

export default App;
