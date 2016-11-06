import React from 'react'
//import {ButtonToolbar, Button} from 'react-bootstrap'
import styles from './LoginNew.css'

export class Login extends React.Component {
  authorize(cb) {
    cb = new window.Codebird();
    cb.setConsumerKey(process.env.REACT_APP_CONSUMER_KEY, process.env.REACT_APP_CONSUMER_SECRET);
    window.cb = cb;
    console.log(`Sending request with: ${JSON.stringify({secret: cb._oauth_consumer_secret, access: cb._oauth_consumer_key})}`);
    let callback = process.env.NODE_ENV === 'development' ?  "http://beto.dev:3000" : "https://positweets.herokuapp.com";
    cb.__call(
      "oauth_requestToken",
      {oauth_callback: callback},
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
              {force_login: true},
              function (auth_url) {
                  window.codebird_auth = window.open(auth_url, '_self');
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
      <div>

        <div className="row" style={styles}>
          <form className="sign-up">
            <h1 className="sign-up-title">Donate your social reach</h1>
            <input type="button" onClick={() => this.authorize(this.props.cb)} value="Sign me up!" className="sign-up-button"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;

          //<div className="col-md-4 col-md-offset-3">
            //<ButtonToolbar className={styles.toolbar}>
              //<Button bsStyle="primary" bsSize="large" onClick={() => this.authorize(this.props.cb)}>Login</Button>
            //</ButtonToolbar>
          //</div>
