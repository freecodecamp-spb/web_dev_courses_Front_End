import React, { Component } from 'react';
import { auth } from './utils/auth';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: auth.getProfile()
    };

  }

  get loginLink() {
    return (
      <button
        className="btn btn-primary"
        onClick={auth.login.bind(this)}>
        login with auth0
      </button>
    );
  }

  getUserBar(profile) {
    return (
      <div className="user-bar">
        <img src={profile.picture} alt={profile.name} />
        <div>{profile.name}</div>
      </div>
    );
  }

  render() {
    let userBar = this.state.profile.name ? this.getUserBar(this.state.profile) : this.loginLink;

    return (
      <div className="App">
        <div className="App-login">
          {userBar}
        </div>
        <div className="App-header">
          <h2>Это каталог курсов по веб-разработке!</h2>
        </div>

        {this.props.children}

      </div>
    );
  }
}

export default App;
