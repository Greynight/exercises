import React from 'react';
import ReactDOM from 'react-dom';
import Orbitrack from './Orbitrack';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Orbitrack />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
