import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider defaultColorScheme="auto">
        <App />
      </MantineProvider>
  </StrictMode>
);