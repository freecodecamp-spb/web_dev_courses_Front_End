import React, {
  Component,
  PropTypes
} from 'react';
import './LoginForm.css';

import { auth } from '../../utils/auth';

export class LoginForm extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      showSignup: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.triggerSignup = this.triggerSignup.bind(this);
  }

  get confirmPassword() {
    return (
      <input
        className="form-control LoginForm__input"
        type="password"
        name="passwordConfirm"
        onChange={this.onChange}
        value={this.state.passwordConfirm}
        placeholder="Enter your password again"
      />
    );
  }

  get localLoginForm() {
    return (
      <form className="LoginForm" onSubmit={this.onSubmit}>

        <button
          className="btn btn-default btn-sm LoginForm__signup-trigger"
          onClick={this.triggerSignup}>Signup?! :)
        </button>

        <input
          className="form-control LoginForm__input"
          name="email"
          onChange={this.onChange}
          value={this.state.email}
          placeholder="Enter your email"
        />

        <input
          className="form-control LoginForm__input"
          type="password"
          name="password"
          onChange={this.onChange}
          value={this.state.password}
          placeholder="Enter your password"
        />

        {this.state.showSignup && this.confirmPassword}

        <button
          type="submit"
          className="btn btn-primary LoginForm__submit"
        >
          {this.state.showSignup ? 'Signup' : 'Login'}
        </button>
      </form>
    );
  }

  render() {

    return (
      <div className="loginPanel">
        <button className="btn btn-primary" onClick={auth.login.bind(this)}>login with auth0</button>
      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onLogin(this.state);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  triggerSignup(e) {
    e.preventDefault();

    this.setState({
      showSignup: !this.state.showSignup
    });
  }

}
