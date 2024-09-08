import React from "react";
import { Link } from "react-router-dom";
import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={classes.navbar}>
        <Link className={classes.link} to="/books-list">Books List</Link>
        <Link className={classes.link} to="/authors-list">Authors List</Link>
        <Link className={classes.link} to="/create-book">Create Book</Link>
        <Link className={classes.link} to="/create-author">Create Author</Link>
    </nav>
  );
};
