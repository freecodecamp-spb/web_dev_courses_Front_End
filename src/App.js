import React, { Component } from 'react';
import { Link } from 'react-router';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-login">
          <Link to="/login">Login</Link>
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
