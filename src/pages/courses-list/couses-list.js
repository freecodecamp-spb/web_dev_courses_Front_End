import React, {
  Component,
  PropTypes
} from 'react';

import './couses-list.css';

import { SearchBar }   from '../../components/search-bar';
import { CoursesList } from '../../components/courses-list';

class CoursesListPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props);

    let query = this.props.location.query;
    let page = Number(query.page);

    this.context = context;
    this.state = {};

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
      <div className="CoursesListPage">

        <div className="CoursesListPage__search">
          <SearchBar />
        </div>

        <CoursesList
          count={this.state.count}
          setPage={this.setPage}
          start={this.page}
          courses={this.state.courses}
        />
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
   * @param {number} page
   */
  getCourses(page) {
    fetch(`/api/courses/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        courses: data.courses,
        count: data.count
      });
    });
  }

}

export { CoursesListPage };
