import React, { Component, PropTypes } from 'react';
import { CourseThumb } from '../../components/course-thumb';
import './couses-list.css';

import { Pagination } from '../../components/pagination';

class CoursesListPage extends Component {
  constructor(props, context) {
    super(props);

    let query = this.props.location.query;

    this.context = context;
    this.state = {courses: []};
    this.paginationCount = 5;

    if (query.page) {
      this.page = Number(query.page);
    } else {
      this.page = 1;
    }

    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    this.getCourses(this.page);
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
          <div className="paginator-text">Вы на странице {this.page} из {this.state.count} страниц</div>

          <Pagination count={this.paginationCount} setPage={this.setPage} start={this.page} />
        </div>

        <ul className="list">
          {coursesItems}
        </ul>
      </div>
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
