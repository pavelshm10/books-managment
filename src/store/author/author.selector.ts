import { Author } from "../../types/Author.type";
import { RootState } from "../store";

const authors = (state: RootState): Author[] => state.authors.authors;

export const authorsSelectors = {
  authors
};