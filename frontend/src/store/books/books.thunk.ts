import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDocument, fetchData } from "../../services/db.service";
import { Book } from "../../types/Book.type";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    return fetchData("books", rejectWithValue);
  }
);

export const addBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
  "books/addBook",
  async (newBook, { rejectWithValue }) => {
    return addDocument("books", newBook, rejectWithValue);
  }
);
