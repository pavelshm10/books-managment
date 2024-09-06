import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDocument, fetchData } from "../../services/db.service";
import { Author } from "../../types/Author.type";

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async (_, { rejectWithValue }) => {
    return fetchData("authors", rejectWithValue);
  }
);

export const addAuthor = createAsyncThunk<
  Author,
  Author,
  { rejectValue: string }
>("authors/addAuthor", async (newAuthor, { rejectWithValue }) => {
  return addDocument("authors", newAuthor, rejectWithValue);
});
