import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { CourseThumb } from '../course-thumb';
import { Pagination } from '../pagination';

import './courses-list.css';

const CoursesList = (props) => {
  let paginationCount = 5;

  let coursesItems = props.courses.map(item => {
    return (
      <li key={item._id}>
        <CourseThumb card={item.card} id={item._id}/>
      </li>
    );
  });

  if (coursesItems.length === 0) {
    coursesItems = <div>Loading...</div>;
  }

  return (
    <div className="CoursesList">

      <div className="controls">

        <div className="paginator controls__item">
          <div className="paginator-text">
            Вы на странице {props.page} из {props.count} страниц
          </div>

          <Pagination
            count={paginationCount}
            setPage={props.setPage}
            start={props.page}
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

CoursesList.PropTypes = {
  start: PropTypes.number,
  count: PropTypes.number,
  courses: PropTypes.array,
  setPage: PropTypes.func
};

export { CoursesList };
