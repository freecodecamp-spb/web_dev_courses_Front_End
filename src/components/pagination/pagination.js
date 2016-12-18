import React, { PropTypes } from 'react';

import './pagination.css';

const Pagination = (props) => {
  let pagesCount = props.count || 1;
  let pageStart = props.start || 1;
  const pages = [...Array(pagesCount).keys()]; // [0, 1, 2, 3]

  const onPageClick = (page) => {
    if (page <= pagesCount) {
      props.setPage(page);
    }
  };

  const onPrevPageClick = () => {
    props.setPage(pageStart - 1);
  };

  const onNextPageClick = () => {
    if (pageStart < pagesCount) {
      props.setPage(pageStart + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li
          key={pageStart - 1}
          onClick={ onPrevPageClick }
        >
          <span>
            <span>&laquo;</span>
          </span>
        </li>

        {pages.map(page => {
          let pageIndex = page + 1; // Array starts with 0
          return (
            <li
              key={pageIndex}
              onClick={ () => onPageClick(pageIndex) }
            >
              <span>{pageIndex}</span>
            </li>
          );
        })}

        <li
          key={pageStart + pagesCount}
          onClick={ onNextPageClick }
        >
          <span>
            <span>&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  setPage: PropTypes.func,
  start: PropTypes.number,
  count: PropTypes.number,
};

export { Pagination };
