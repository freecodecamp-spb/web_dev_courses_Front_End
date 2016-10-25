import React, { Component } from 'react';

import { CourseCard } from '../../components/course-card';

export class CoursesItemPage extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  componentDidMount() {
    this.getCourse();
  }
  
  render() {
    let course = this.state.course;
    let thumb;
    
    if (course) {
      thumb = <CourseCard card={course.card} id={course._id}/>;
    }
    
    return (
      <div className="CoursesItemPage">
        <h3>Карточка курса</h3>
  
        { thumb }
      </div>
    );
  }
  
  getCourse() {
    fetch('/api/courses/' + this.props.params.id).then(response => {
      response.json().then(data => this.setState({
        course: data
      }))
    });
  }
}
