import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorFallback from './ui/ErrorFallback.tsx';
import GlobalStyles from './styles/GlobalStyles.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </>
);
