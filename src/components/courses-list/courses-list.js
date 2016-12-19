import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { CourseThumb } from '../course-thumb';
import { Pagination } from '../pagination';

import './courses-list.css';

const CoursesList = (props) => {
  let itemsCount = props.itemsCount || 0;
  let itemsPerPage = 5;
  let coursesItems;

  if (!props.courses || props.courses.length === 0) {
    coursesItems = <li>Loading...</li>;

  } else {
    coursesItems = props.courses.map(item => {
      return (
        <li className="item" key={item._id}>
          <button className="btn delete coursethumb__delete" onClick={() => props.deleteCourse(item)}>
            <svg id="i-trash" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
              <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
            </svg>
          </button>
          <CourseThumb card={item.card} id={item._id}/>
        </li>
      );
    });
  }

  return (
    <div className="CoursesList">

      <div className="controls">

        <div className="paginator controls__item">
          <div className="paginator-text">
            Вы на странице {props.start} из {Math.ceil(itemsCount / itemsPerPage)} страниц
          </div>

          <Pagination
            count={Math.ceil(itemsCount / itemsPerPage)}
            setPage={props.setPage}
            start={props.start}
          />
        </div>

        <div className="add-button controls__item">
          <Link className="btn btn-default" to="/courses/new">Добавить</Link>
        </div>
      </div>


      <ul className="list">
        {coursesItems}
      </ul>
    </div>
  );
};

CoursesList.propTypes = {
  start: PropTypes.number,
  itemsCount: PropTypes.number,
  courses: PropTypes.array,
  setPage: PropTypes.func,
  deleteCourse: PropTypes.func,
};

export { CoursesList };
