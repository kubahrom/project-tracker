import React from 'react';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Test from './components/test';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Test />
      </Router>
    </AuthProvider>
  );
};

export default App;
