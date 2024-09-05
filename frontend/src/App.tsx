import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components";
import BooksList from "./pages/BooksList/BooksList";
import AuthorsList from "./pages/AuthorsList/AuthorsList";
import CreateAuthor from "./pages/CreateAuthor/CreateAuthor";
import CreateBook from "./pages/CreateBook/CreateBook";

function App() {
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
