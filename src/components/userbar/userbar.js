import React, { Component } from 'react';
import { auth } from '../../utils/auth';

class Userbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: auth.getProfile()
    };

    auth.on('profile_updated', profile => this.setState({profile}));
    auth.on('logout', () => this.setState({profile: {}}));
  }

  get loginLink() {
    return (
      <button
        className="btn btn-primary"
        onClick={auth.login}>
        login with auth0
      </button>
    );
  }

  get logoutLink() {
    return (
      <button
        className="btn btn-primary"
        onClick={auth.logout}>
        logout
      </button>
    );
  }

  get userBar() {
    let profile = this.state.profile || {};

    return (
      <div className="user-bar">
        <div className="user-bar__info">
          <img className="user-bar__picture" src={profile.picture} alt={profile.name}/>
          <div className="user-bar__name">{profile.name}</div>
        </div>

        <div className="user-bar__logout">
          {this.logoutLink}
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="Userbar">
        { (this.state.profile && this.state.profile.name) ? this.userBar : this.loginLink }
      </div>
    );
  }
}

export { Userbar };
