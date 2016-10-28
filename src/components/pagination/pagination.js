import React from 'react';

import './pagination.css';

const Pagination = (props) => {
  let pages = [];
  let pagesCount = props.count;
  let pageStart = props.start;

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
          key={props.start - 1}
          onClick={ () => props.setPage(props.start - 1) }
        >
          <span>
            <span>&laquo;</span>
          </span>
        </li>
        {pages}
        <li
          onClick={ () => props.setPage(props.start + props.count)}
          key={props.start + props.count}
        >
          <span>
            <span>&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export { Pagination };
