import React, { Component } from 'react';
import './App.css';

import { CourseThumb } from './components/course-thumb';
import { SearchBar } from './components/search-bar';


class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {courses: []};
  }
  
  componentWillMount() {
    fetch('/api/courses/')
      .then(response => {
        response.json().then(data => this.setState({courses: data}))
    });
  }
  
  changeQueryHandler(query) {
    console.log("query: ", query);
  }
  
  render() {
    
    let coursesItems = this.state.courses.map(item => {
      return (
        <li key={item._id}>
          <CourseThumb card={item.card} />
        </li>
      );
    });
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Это каталог курсов по веб-разработке!</h2>
  
          <div className="App-search">
            <SearchBar changeQueryHandler={this.changeQueryHandler} />
          </div>
        </div>
        
        <div className="App-courses-list">
          <ul>
            {coursesItems}
          </ul>
        </div>
        
      </div>
    );
  }
}

export default App;
