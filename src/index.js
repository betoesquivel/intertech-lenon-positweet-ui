import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let cb = {};
if (typeof window !== 'undefined' && typeof window.Codebird !== 'undefined') {
  cb = new window.Codebird();
  cb.setConsumerKey(process.env.REACT_APP_CONSUMER_KEY, process.env.REACT_APP_CONSUMER_SECRET);
  window.cb = cb;
}

ReactDOM.render(
  <App cb={cb}/>,
  document.getElementById('root')
);
