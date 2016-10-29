import React, { PropTypes } from 'react';

import './pagination.css';

const Pagination = (props) => {
  let pages = [];
  let pagesCount = props.count || 5;
  let pageStart = props.start || 1;

  for (let i = 0; i < pagesCount; ++i) {
    let page = pageStart + i;

    pages.push(
      <li
        key={page}
        onClick={ () => props.setPage(page) }
      >
        <span>{page}</span>
      </li>);
  }

  return (
    <nav>
      <ul className="pagination">
        <li
          key={pageStart - 1}
          onClick={ () => props.setPage(pageStart - 1) }
        >
          <span>
            <span>&laquo;</span>
          </span>
        </li>
        {pages}
        <li
          key={pageStart + pagesCount}
          onClick={ () => props.setPage(pageStart + pagesCount)}
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
