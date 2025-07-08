import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthWrapper from './components/auth/AuthWrapper.jsx';

// Ensure we're using the JSX version of hooks
import './hooks/useAuth.jsx';
import './hooks/useCurrency.jsx';
import './hooks/useGuests.jsx';
import './hooks/useInventory.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </StrictMode>
);