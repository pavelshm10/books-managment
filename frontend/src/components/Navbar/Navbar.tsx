import React from "react";
import { Link } from "react-router-dom";
import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <li>
        <Link to="/books-list">Books List</Link>
      </li>
      <li>
        <Link to="/authors-list">Authors List</Link>
      </li>
      <li>
        <Link to="/create-book">Create Book</Link>
      </li>
      <li>
        <Link to="/create-author">Create Author</Link>
      </li>
    </nav>
  );
};
