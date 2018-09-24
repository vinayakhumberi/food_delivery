import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import deepOrange from '@material-ui/core/colors/deepOrange';
import AppRoutes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500],
      contrastText: '#ffffff',
    },
    secondary: { main: '#11cb5f' },
  },
});

const render = (Component) => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
	    <Provider store={store}>
	      <div>
		      <Component />
	      </div>
	    </Provider>
	</MuiThemeProvider>,
    document.getElementById('root'),
  );
};

render(AppRoutes);
registerServiceWorker();
