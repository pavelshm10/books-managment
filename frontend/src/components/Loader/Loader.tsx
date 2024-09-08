import React from "react";
import { useSelector } from "react-redux";
import { booksSelectors } from "../../store/books/books.selector";
import classes from './Loader.module.scss'
export default function Loader() {
  const isLoading = useSelector(booksSelectors.loading);
  if (!isLoading) {
    return null;
  }
  return (
    <div className={classes.loader_overlay}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
}
