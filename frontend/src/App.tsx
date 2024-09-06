import React, { useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components";
import BooksList from "./pages/BooksList/BooksList";
import AuthorsList from "./pages/AuthorsList/AuthorsList";
import CreateAuthor from "./pages/CreateAuthor/CreateAuthor";
import CreateBook from "./pages/CreateBook/CreateBook";
import { fetchBooks } from "./store/books/books.thunk";
import { useAppDispatch } from "./store/store";
import { fetchAuthors } from "./store/author/author.thunk";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch (fetchBooks());
    dispatch (fetchAuthors());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books-list" element={<BooksList />} />
        <Route path="/authors-list" element={<AuthorsList />} />
        <Route path="/create-author" element={<CreateAuthor />} />
        <Route path="/create-book" element={<CreateBook />} />
      </Routes>
    </Router>
  );
}

export default App;
