import React, { Component } from 'react';
import './App.css';

import { SearchBar } from './components/search-bar';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Это каталог курсов по веб-разработке!</h2>
  
          <div className="App-search">
            <SearchBar />
          </div>
        </div>
        
        {this.props.children}
        
      </div>
    );
  }
}

export default App;
