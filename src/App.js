import React, { Component } from 'react';
import './App.css';

import { CourseThumb } from './components/course-thumb';


class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {courses: []};
  }
  
  componentWillMount() {
    fetch('http://localhost:3333/api/courses/')
      .then(response => {
        response.json().then(data => this.setState({courses: data}))
    });
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
          <h2>Welcome to Courses Catalog!</h2>
        </div>
        
        <ul>
          {coursesItems}
        </ul>
        
      </div>
    );
  }
}

export default App;
