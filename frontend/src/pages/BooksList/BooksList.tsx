import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { booksSelectors } from "../../store/books/books.selector";
import classes from "./BooksList.module.scss";
import BookCard from "./BookCard/BookCard";
import Pagination from "../../components/CustomPagination/CustomPagination";

export default function BooksList() {
  const books = useSelector(booksSelectors.books);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  // Calculate the indices for slicing the books array
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className={classes.book_list}>
        {currentBooks &&
          currentBooks.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
      <div className={classes.pagination_container}>
        <Pagination
          totalItems={books.length}
          itemsPerPage={booksPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
