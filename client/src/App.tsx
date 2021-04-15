import React from 'react';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Theme from './styles/Theme';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from './context/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Theme>
            <CssBaseline />
            <Layout />
          </Theme>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
