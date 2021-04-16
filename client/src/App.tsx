import React from 'react';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Theme from './styles/Theme';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from './context/theme';
import { ProjectProvider } from './context/project';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <Router>
            <Theme>
              <CssBaseline />
              <Layout />
            </Theme>
          </Router>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
