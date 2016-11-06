import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';

//const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class App extends Component {
  constructor() {
    super();
    const current_url = typeof location !== 'undefined' ? location.toString() : '';
    const queryMatch  = current_url.match(/\?(.+)$/);
    window.queryMatch = queryMatch;
    const query = queryMatch !== null ? queryMatch[queryMatch.length-1].split("&") : '';
    window.query = query;
    let parameters  = {};
    let parameter;

    for (var i = 0; i < query.length; i++) {
        parameter = query[i].split("=");
        if (parameter.length === 1) {
            parameter[1] = "";
        }
        parameters[decodeURIComponent(parameter[0])] = decodeURIComponent(parameter[1]);
    }

    if (typeof parameters.oauth_verifier !== "undefined") {
        console.log(`Came from a callback with: ${JSON.stringify(parameters)}`);
        let cb = new window.Codebird();
        cb.setConsumerKey(process.env.REACT_APP_CONSUMER_KEY, process.env.REACT_APP_CONSUMER_SECRET);
        if (typeof Storage !== 'undefined') {
          cb.setToken(
            localStorage.getItem('oauth_token'),
            localStorage.getItem('oauth_token_secret')
          );
          cb.__call(
              "oauth_accessToken",
              {
                  oauth_verifier: parameters.oauth_verifier
              },
              function (reply) {
                  cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                  console.log(`Done: ${JSON.stringify(reply)}`);
                  window.cb = cb;
              }
          );
        } else {
          console.log("ERROR: No local storage support");
        }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Login {...this.props} />
      </div>
    );
  }
}

export default App;
