import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addAuthor, fetchAuthors, updateAuthor } from "./author.thunk";
import { Author } from "../../types/Author.type";

interface AuthorsState {
  authors: Author[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthorsState = {
  authors: [],
  loading: false,
  error: null,
};

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    updateAuthorStatus(state,action: PayloadAction<{ docId: string; newStatus: boolean }>) {
      const { docId, newStatus } = action.payload;
      const author = state.authors.find((a) => a.id === docId);
      if (author) {
        author.active = newStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Author to Firebase
      .addCase(addAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authors.push(action.payload as Author);
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Author to Firebase
      .addCase(updateAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAuthor.fulfilled,
        (
          state,
          action: PayloadAction<{ docId: any; fieldName: string; value: any }>
        ) => {
          const { docId, fieldName, value } = action.payload;
          const author = state.authors.find((a) => a.id === docId);
          if (author) {
            (author as any)[fieldName] = value;
          }
          state.loading = false;
        }
      )
      .addCase(updateAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateAuthorStatus } = authorsSlice.actions;
export default authorsSlice.reducer;
