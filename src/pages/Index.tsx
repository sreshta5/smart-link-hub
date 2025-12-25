import { useState } from 'react';
import { Auth } from './Auth';
import { Dashboard } from './Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
};

export default Index;
