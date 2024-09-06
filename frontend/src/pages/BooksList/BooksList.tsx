import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { booksSelectors } from '../../store/books/books.selector';

export default function BooksList() {
  const books=useSelector(booksSelectors.books)
  
  useEffect(()=>{
    console.log('update list',books)
  },[books]);

  return (
    <div>BooksList</div>
  )
}
