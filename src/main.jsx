import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthWrapper from './components/auth/AuthWrapper.jsx';

// Use JSX versions of hooks - prevent duplicate files issue
import './hooks/useAuth.jsx';
import './hooks/useCurrency.jsx';
import './hooks/useGuests.jsx';
import './hooks/useInventory.jsx';
import './hooks/useSupabase.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </StrictMode>
);