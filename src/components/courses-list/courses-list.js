import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { CourseThumb } from '../course-thumb';
import { Pagination } from '../pagination';

import './courses-list.css';

const CoursesList = (props) => {
  let itemsCount = props.itemsCount || 0;
  let paginationCount = 5;
  let coursesItems;

  if (!props.courses || props.courses.length === 0) {
    coursesItems = <li>Loading...</li>;

  } else {
    coursesItems = props.courses.map(item => {
      return (
        <li className="item" key={item._id}>
          <button className="btn btn-danger delete" onClick={() => props.deleteCourse(item)}>Delete</button>
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
            Вы на странице {props.start} из {Math.ceil(itemsCount / paginationCount)} страниц
          </div>

          <Pagination
            count={Math.min(Math.floor(itemsCount / paginationCount), paginationCount)}
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
