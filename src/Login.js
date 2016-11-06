import React from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import styles from './Login.css'

export class Login extends React.Component {
  authorize(cb) {
    cb = new window.Codebird();
    cb.setConsumerKey(process.env.REACT_APP_CONSUMER_KEY, process.env.REACT_APP_CONSUMER_SECRET);
    window.cb = cb;
    console.log(`Sending request with: ${JSON.stringify({secret: cb._oauth_consumer_secret, access: cb._oauth_consumer_key})}`);
    cb.__call(
      "oauth_requestToken",
      {oauth_callback: "http://positweets.herokuapp.com"},
      function (reply) {
        console.log(`Got back: ${JSON.stringify(reply)}`);
        // stores it
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('oauth_token', reply.oauth_token);
          localStorage.setItem('oauth_token_secret', reply.oauth_token_secret);
          cb.setToken(reply.oauth_token, reply.oauth_token_secret);

          // gets the authorize screen URL
          cb.__call(
              "oauth_authorize",
              {},
              function (auth_url) {
                  window.codebird_auth = window.open(auth_url);
              }
          );
        } else {
          console.log("ERROR: No local storage support");
        }
      }
    );
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={() => this.authorize(this.props.cb)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
