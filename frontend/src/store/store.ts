import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import booksReducer from './books/books.reducer';
import authorReducer from './author/author.reducer';

const store = configureStore({
  reducer: {
    books: booksReducer,
    authors: authorReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
