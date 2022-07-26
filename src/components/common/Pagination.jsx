import _ from "lodash";
import React from "react";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  //ceils function is used here to round up the decmal precision

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  //creating the arrays from 1 to pagesCount+1(function not includes last value)

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
