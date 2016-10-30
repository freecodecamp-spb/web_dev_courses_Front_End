import React, { Component } from 'react';

import { CourseCardForm } from '../../components/course-card-form';

export class CoursesNewPage extends Component {
  render() {
    return (
      <div className="CoursesNewPage">
        {this.props.children}

        <CourseCardForm
          onSave={ this.create }
          card={ this.cardStub } />
      </div>
    );
  }

  /**
   * @param {Object} card
   */
  create(card) {
    let request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(card)
    };

    fetch(`/api/courses/`, request)
    .then((res) => res.json())
    .then((data) => console.log("data: ", data))
  }

  /**
   * @return {object}
   */
  get cardStub() {
    return {
      title: '',
      author: '',
      image: '',
      description: '',
      link: ''
    };
  }
}
