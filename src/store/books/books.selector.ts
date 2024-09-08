import { Book } from "../../types/Book.type";
import { RootState } from "../store";

const books = (state: RootState): Book[] => state.books.books;
const loading = (state: RootState): boolean => state.books.loading;

export const booksSelectors = {
  books,
  loading
};