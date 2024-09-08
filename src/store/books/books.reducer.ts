import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addBook, fetchBooks, updateBook } from "./books.thunk";
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
  reducers: {
    updateBookStatus(state, action: PayloadAction<{ docId: string; newStatus: boolean }>) {
      const { docId, newStatus } = action.payload;
      const book = state.books.find((b) => b.id === docId);
      if (book) {
        book.active = newStatus;
      }
    },
  },
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
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload as Book);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Book to Firebase
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateBook.fulfilled,
        (
          state,
          action: PayloadAction<{ docId: any; fieldName: string; value: any }>
        ) => {
          const { docId, fieldName, value } = action.payload;
          const book = state.books.find((b) => b.id === docId);
          if (book) {
            (book as any)[fieldName] = value;
          }
          state.loading = false;
        }
      )
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateBookStatus } = booksSlice.actions;
export default booksSlice.reducer;
