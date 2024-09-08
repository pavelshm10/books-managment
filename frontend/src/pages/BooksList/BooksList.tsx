import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { booksSelectors } from "../../store/books/books.selector";
import classes from "./BooksList.module.scss";
import BookCard from "./BookCard/BookCard";

export default function BooksList() {
  const books = useSelector(booksSelectors.books);

  return (
    <div className={classes.book_list}>
      {books && books.map((book) => <BookCard key={book.id} book={book} />)}
    </div>
  );
}
