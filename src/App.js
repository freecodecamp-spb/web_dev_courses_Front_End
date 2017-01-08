import React, { Component } from 'react';
import { Link } from 'react-router';

import { Userbar } from './components/userbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-login">
          <Userbar />
        </div>
        <div className="App-header">
          <h2>web | dev | courses</h2>
        </div>
        <nav className="App-memu">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/courses">Каталог</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
