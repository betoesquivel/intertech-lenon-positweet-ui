import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Login from './Login.js';

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
                  window.firebase.database().ref('positweeters/' + reply.user_id).set({
                    token: reply.oauth_token,
                    token_secret: reply.oauth_token_secret,
                    screen_name: reply.screen_name
                  });
                  window.cb = cb;
                  window.location = "https://positweet-ebff4.firebaseapp.com/?#"
              }
          );
        } else {
          console.log("ERROR: No local storage support");
        }
    }
  }

  render() {
    return (
      <div className="App" style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height: '100%'}}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="container">
          <div className="row">
            <Login {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
