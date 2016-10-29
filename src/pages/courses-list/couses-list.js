import React, { Component, PropTypes } from 'react';
import './couses-list.css';

import { CoursesList } from '../../components/courses-list';

class CoursesListPage extends Component {
  constructor(props, context) {
    super(props);

    let query = this.props.location.query;
    let page = Number(query.page);

    this.context = context;
    this.state = {courses: []};
    this.paginationCount = 5;

    if (!isNaN(page)) {
      this.page = page;
    } else {
      this.page = 1;
    }

    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    this.getCourses(this.page);
  }

  render() {
    return (
      <CoursesList
        count={this.state.count}
        setPage={this.setPage}
        start={this.page}
        courses={this.state.courses}
      />
    );
  }

  setPage(page) {
    if (this.page === page) return;

    this.page = page;

    this.context.router.push({
      query: {
        page: page
      }
    });

    this.getCourses(this.page);
  }

  /**
   *
   * @param {number} page
   */
  getCourses(page) {
    fetch('/api/courses/?page=' + page).then(response => {
      response.json().then(data => this.setState({
        courses: data.courses,
        count: data.count
      }))
    });
  }

}

CoursesListPage.contextTypes = {
  router: PropTypes.any
};

export {CoursesListPage as CoursesListPage};
