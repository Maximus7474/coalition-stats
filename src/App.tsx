import React from 'react';
import ThemeButton from './components/ToggleTheme';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Title } from '@mantine/core';

const App: React.FC = () => {

  


  return (
    <Router>
      <Navbar />
      <ThemeButton />
      <Routes>
        <Route path="/" element={<Title>Temp</Title>} />
      </Routes>
    </Router>
  );
}

export default App;
