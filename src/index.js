import React from 'react';
import ReactDOM from 'react-dom';
import PNotifyBrightTheme from 'pnotify/dist/PNotifyBrightTheme.css';
import App from './components/App/App';
import Style from './components/App/App.module.css';

ReactDOM.render(
  <App className={(PNotifyBrightTheme, Style)} />,
  document.getElementById('root'),
);
