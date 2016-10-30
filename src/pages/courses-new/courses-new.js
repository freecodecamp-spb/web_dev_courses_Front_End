import React, { Component, PropTypes } from 'react';
import { CourseCardForm } from '../../components/course-card-form';

class CoursesNewPage extends Component {
  constructor(props, context) {
    super(props);

    this.context = context;

    this.create = this.create.bind(this);
  }

  render() {
    return (
      <div className="CoursesNewPage">
        {this.props.children}

        <CourseCardForm
          onSave={ this.create }
          card={ this.cardStub }/>
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
    .then((data) => {
      if (data._id) {
        this.context.router.push({
          pathname: `/courses/${data._id}`
        });
      }
    })
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

CoursesNewPage.contextTypes = {
  router: PropTypes.object
};

export { CoursesNewPage };
