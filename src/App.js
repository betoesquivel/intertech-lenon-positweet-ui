require('dotenv').config();
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import AuthService from './utils/AuthService.js';

console.log(`${JSON.stringify(process.env)}`);
const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

class App extends Component {
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
        <Login auth={auth} />
      </div>
    );
  }
}

export default App;
