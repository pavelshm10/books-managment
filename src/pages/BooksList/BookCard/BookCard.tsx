import React from "react";
import classes from "./BookCard.module.scss";
import { Book } from "../../../types/Book.type";
import { useAppDispatch } from "../../../store/store";
import { Switch } from "@mui/material"; // Import the MUI Switch component
import { updateBook } from "../../../store/books/books.thunk";
import { updateBookStatus } from "../../../store/books/books.reducer";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const dispatch = useAppDispatch();

  const handleToggleStatus = (book: Book) => {
    dispatch(updateBookStatus({ docId: book.id!, newStatus: !book.active }));
    dispatch(
      updateBook({
        docId: book.id! as string,
        fieldName: "active",
        value: !book.active,
      })
    );
  };

  return (
    <div className={classes.card_container}>
      <h1 className={classes.book_title}>{book.title}</h1>
      <div className={classes.card_body}>
        <p>
          <b>Price:</b> {book.price}$
        </p>
        <p className={classes.book_description}>
          <b>Description:</b> {book.description}
        </p>
        <p>
          <b>Category:</b> {book.category}
        </p>
        <p>
          <b>Author:</b> {book.author}
        </p>
        <div className='flex'>
          <img className={classes.book_img} src={book.imageUrl} />
        </div>
        <div>
          <Switch
            checked={book.active}
            onChange={() => {
              handleToggleStatus(book);
            }}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
