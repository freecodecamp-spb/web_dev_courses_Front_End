import React, { Component } from 'react';
import { SearchBar } from '../../components/search-bar';
import { CoursesList } from '../../components/courses-list';
import './couses-list.css';

class CoursesListPage extends Component {

  constructor(props, context) {
    super(props);
    this.setPage = this.setPage.bind(this);
    this.setStateTitleCoursesToFind = this.setStateTitleCoursesToFind.bind(this);

    this.context = context;
    this.state = {};
  }

  componentDidMount() {
    let query = this.props.location.query;
    let page = Number(query.page) || 1;
    let queryTitle = query.queryTitle;

    this.fetchCourses({page, queryTitle});
  }

  render() {
    return (
      <div className="CoursesListPage">

        <div className="CoursesListPage__search">
          <SearchBar changeQueryHandler={this.setStateTitleCoursesToFind}/>
        </div>

        <CoursesList
          itemsCount={this.state.itemsCount}
          setPage={this.setPage}
          start={this.state.page}
          courses={this.state.courses}
        />
      </div>
    );
  }

  fetchCourses(query = {}) {

    fetch(`/api/courses/?page=${query.page || 1}&queryTitle=${query.queryTitle || ''}`)
    .then(response => response.json())
    .then(data => {

      this.setState({
        courses: data.courses,
        itemsCount: data.count,
        page: query.page || 1
      });

    });
  }

  /**
   *
   * @param {number} page
   */
  setPage(page) {
    this.fetchCourses({page})
  }

  /**
   *
   * @param {string} queryTitle
   */
  setStateTitleCoursesToFind(queryTitle) {
    this.fetchCourses({queryTitle});
  }

}

export { CoursesListPage };
