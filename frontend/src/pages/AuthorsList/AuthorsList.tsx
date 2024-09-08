import React from "react";
import { useSelector } from "react-redux";
import { authorsSelectors } from "../../store/author/author.selector";
import { Book } from "../../types/Book.type";
import { Switch } from "@mui/material";
import { Author } from "../../types/Author.type";
import { updateAuthorStatus } from "../../store/author/author.reducer";
import { updateAuthor } from "../../store/author/author.thunk";
import { booksSelectors } from "../../store/books/books.selector";
import { useAppDispatch } from "../../store/store";
import classes from "./AuthorsList.module.scss"

export default function AuthorsList() {
  const authors = useSelector(authorsSelectors.authors);
  const books = useSelector(booksSelectors.books);
  const dispatch = useAppDispatch();

  const handleToggleStatus = (author: Author) => {
    dispatch(
      updateAuthorStatus({ docId: author.id!, newStatus: !author.active })
    );
    dispatch(updateAuthor({docId: author.id! as string,fieldName:"active",value:!author.active}));
  };

  const getBooksByAuthor = (authorName: string) => {
    return books.filter((book) => book.author === authorName);
  };
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Books</th>
          <th>Country</th>
          <th>Picture</th>
          <th>Age</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className={classes.tbody}>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>
              <ul>
                {getBooksByAuthor(author.name).map((book: Book) => (
                  <li key={book.id}>{book.title}</li>
                ))}
              </ul>
            </td>
            <td>{author.country}</td>
            <td>
              <img
                src={author.pictureUrl}
                alt={`${author.name}`}
                style={{ width: "50px", height: "50px" }}
              />
            </td>
            <td>{author.age}</td>
            <td>
              <Switch
                checked={author.active}
                onChange={() => {
                  handleToggleStatus(author);
                }}
                color="primary"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
