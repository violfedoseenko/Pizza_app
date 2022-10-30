import React from "react";
import ReactPaginate from "react-paginate";
import style from "./pagination.module.scss";

const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={style.root}
      onPageChange={(event) => onChangePage(event.selected + 1)}
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
