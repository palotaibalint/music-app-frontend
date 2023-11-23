import React from "react";

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}> = (props) => {
  const pageNumbers = [];

  for (
    let i = Math.max(1, props.currentPage - 2);
    i <= Math.min(props.totalPages, props.currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={() => props.paginate(1)}>
          <button className="page-link">First page</button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={
              "page-item" + (props.currentPage === number ? " active" : "")
            }
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        <li
          className="page-item"
          onClick={() => props.paginate(props.totalPages)}
        >
          <button className="page-link">Last page</button>
        </li>
      </ul>
    </nav>
  );
};
