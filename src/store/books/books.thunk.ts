import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDocument,
  fetchData,
  updateDocument,
} from "../../services/db.service";
import { Book } from "../../types/Book.type";
import { UpdateFieldPayload } from "../../types/General.type";

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

export const updateBook = createAsyncThunk<
  UpdateFieldPayload,
  UpdateFieldPayload,
  { rejectValue: string }
>(
  "books/updateBookStatus",
  async ({ docId, fieldName, value }, { rejectWithValue }) => {
    return updateDocument('books',docId, fieldName, value, rejectWithValue);
  }
);
