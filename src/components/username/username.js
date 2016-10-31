import React, { Component } from 'react';

class Username extends Component {

  render() {
    let user = this.props.user;
    let content;

    if (user) {
      content = <div className="name">{ user.name }</div>;
    } else {
      content = (
        <div className="auth">
          <button
            className="btn btn-default"
            onClick={()=> this.props.login('github') }>
            Войти c помощью github
          </button>
        </div>);
    }

    return (
      <div className="Username">
        {content}
      </div>
    );
  }
}

export { Username };
