import React, { Component } from 'react';
import './App.css';

import { CourseThumb } from './components/course-thumb';
import { SearchBar } from './components/search-bar';


class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      courses: [],
      page: 0
    };
  
    this.setPrevPage = this.setPrevPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
  }
  
  componentWillMount() {
    this.getCourses();
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
          
          <div className="paginator">
            <div>Вы на странице {this.state.page}</div>
            
            <button onClick={this.setPrevPage}>назад</button>
             |
            <button onClick={this.setNextPage}>вперед</button>
          </div>
          
          <ul>
            {coursesItems}
          </ul>
        </div>
        
      </div>
    );
  }
  
  setPrevPage() {
    let page = this.state.page > 0 ? (this.state.page - 1) : 0;
    
    this.setState({
      page: page
    });
  
    this.getCourses();
  }
  
  setNextPage() {
    this.setState({
      page: this.state.page + 1
    });
  
    this.getCourses();
  }
  
  getCourses() {
    fetch('/api/courses/?page=' + this.state.page).then(response => {
      response.json().then(data => this.setState({
        courses: data,
        page: this.state.page
      }))
    });
  }
}

export default App;
