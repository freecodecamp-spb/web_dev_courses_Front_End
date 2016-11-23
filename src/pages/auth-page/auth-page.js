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

  onLogin(data) {
    console.log("data: ", data);
    let userData = Object.assign({}, data);

    delete userData.showSignup;

    let request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userData)
    };

    if (data.showSignup) {
      fetch('/api/auth/signup', request)
      .then(response => response.json())
      .then(data => {
        console.log("data: ", data);
      });
    }

  }
}
