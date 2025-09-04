import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type { ReactPaginateProps } from "react-paginate";

interface PaginationProps {
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  pageCount: number;
}

export default function Pagination({ currentPage, onPageChange, pageCount }: PaginationProps ) {
  if (pageCount <= 1) return null;

  const handlePageChange: ReactPaginateProps["onPageChange"] = (event) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      pageCount={pageCount}
      previousLabel="<-"
      nextLabel="->"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

