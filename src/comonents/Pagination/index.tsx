import React from 'react'
import ReactPaginate from 'react-paginate'
import style from './pagination.module.scss'

type PaginationProps = {
  onChangePage: (page: number) => void
  currentPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => {
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
    />
  )
}
