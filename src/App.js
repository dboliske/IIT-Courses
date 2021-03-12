import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './general/Header';
import Sideline from './general/Sideline';

import Home from './home';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // A custom theme for this app
  const theme = createMuiTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Source Sans Pro',
          'Open Sans',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  });

  const [showSide, setShowSide] = React.useState(false);

  const handleSideToggle = () => {
    setShowSide(!showSide);
  }

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <div id="outer-container">
        <Header handleSideToggle={handleSideToggle}/>
        <Sideline showSide={showSide} handleSideToggle={handleSideToggle} />
        <div id="body" className={theme.mixins.toolbar}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/home" component={Home}/>
            </Switch>
          </Router>
        </div>
        <div id="footer"></div>
      </div>
    </ThemeProvider>
  );
}