import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDocument, fetchData, updateDocument } from "../../services/db.service";
import { Author } from "../../types/Author.type";
import { UpdateFieldPayload } from "../../types/General.type";

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async (_, { rejectWithValue }) => {
    return fetchData("authors", rejectWithValue);
  }
);

export const addAuthor = createAsyncThunk<Author, Author, { rejectValue: string }>(
  "authors/addAuthor",
  async (newAuthor, { rejectWithValue }) => {
    return addDocument("authors", newAuthor, rejectWithValue);
  }
);

export const updateAuthor = createAsyncThunk<
  UpdateFieldPayload,
  UpdateFieldPayload,
  { rejectValue: string }
>(
  "authors/updateAuthorStatus",
  async ({docId, fieldName, value }, { rejectWithValue }) => {
    return updateDocument('authors',docId, fieldName, value, rejectWithValue);
  }
);
