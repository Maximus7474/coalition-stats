import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const RootComponent = () => {
  return (
    <StrictMode>
        <MantineProvider defaultColorScheme="auto">
          <App />
        </MantineProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<RootComponent />);
