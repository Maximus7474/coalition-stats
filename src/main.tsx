import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

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
