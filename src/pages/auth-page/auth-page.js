import React, { Component } from 'react';

import { LoginForm } from '../../components/login-form';

import './AuthPage.css';

export class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }


  render() {

    return (
      <div className="AuthPage">
        <h3>Login</h3>
        <LoginForm onLogin={this.onLogin} />
      </div>
    );
  }

  onLogin(...args) {
    console.log("event: ", ...args);
  }
}
