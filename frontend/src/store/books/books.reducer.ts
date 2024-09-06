import { createSlice } from "@reduxjs/toolkit";
import { addBook, fetchBooks } from "./books.thunk";
import { Book } from "../../types/Book.type";

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get Books from Firebase
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Book to Firebase
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload as Book);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default booksSlice.reducer;
