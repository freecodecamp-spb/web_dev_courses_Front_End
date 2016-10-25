import React, { Component } from 'react';

import { CourseThumb } from '../../components/course-thumb';

import './couses-list.css';

export class CoursesListPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      courses: [],
      page: 0
    };
    
    this.setPrevPage = this.setPrevPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
  }
  
  componentDidMount() {
    this.getCourses();
  }
  
  render() {

    let coursesItems = this.state.courses.map(item => {
      return (
        <li key={item._id}>
          <CourseThumb card={item.card} id={item._id}/>
        </li>
      );
    });
    
    return (
      <div className="CoursesList">
    
        <div className="paginator">
          <div>Вы на странице {this.state.page} из {this.state.count} страниц</div>
      
          <button className="btn btn-default" onClick={this.setPrevPage}>назад</button>
          <button className="btn btn-default" onClick={this.setNextPage}>вперед</button>
        </div>
    
        <ul className="list">
          {coursesItems}
        </ul>
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
        courses: data.courses,
        page: this.state.page,
        count: data.count
      }))
    });
  }
  
}
