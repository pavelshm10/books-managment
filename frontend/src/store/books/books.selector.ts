import { Book } from "../../types/Book.type";
import { RootState } from "../store";

const books = (state: RootState): Book[] => state.books.books;

export const booksSelectors = {
  books
};