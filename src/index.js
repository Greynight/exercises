import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import AppContainer from './components/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const render = () => {
  const Application = () => (
    <Provider store={store} >
        <MuiThemeProvider>
          <AppContainer/>
        </MuiThemeProvider>
    </Provider>
  );

  ReactDOM.render(
    <Application />,
    document.getElementById('root')
  );
};

render();

store.subscribe(render);
