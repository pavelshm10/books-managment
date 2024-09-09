import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { bookValidationSchema } from "../../validation/book.schema";
import { useUploadImageFile } from "../../hooks/useUploadImageFile";
import { Book } from "../../types/Book.type";
import { useSelector } from "react-redux";
import { booksSelectors } from "../../store/books/books.selector";
import { useAppDispatch } from "../../store/store";
import { addBook } from "../../store/books/books.thunk";
import { authorsSelectors } from "../../store/author/author.selector";
import classes from "./CreateBook.module.scss";

export default function CreateBook() {
  const authors = useSelector(authorsSelectors.authors);
  const books = useSelector(booksSelectors.books);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik<Book>({
    initialValues: {
      title: "",
      price: 10,
      description: "",
      category: "",
      imageUrl: "",
      author: "",
      active: true,
    },
    validationSchema: bookValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (Object.keys(formik.errors).length === 0) {
        try {
          if (!imageFile) return;
          //upload image to firebase on submit
          uploadImageToFirebase(
            imageFile,
            `images/books/${formik.values.title}_${formik.values.author}`
          ).then((url) => {
            dispatch(addBook({ ...formik.values, imageUrl: url }));
          });
          clearForm(resetForm as (nextValues?: Partial<Book>) => void);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
  });

  const {
    handleFileInputChange,
    uploadImageToFirebase,
    clearForm,
    setFormSubmitted,
    imageFile,
    formSubmitted,
  } = useUploadImageFile(formik, fileInputRef);

  const checkDuplicateTitleForAuthor = (): boolean => {
    const filteredBooks = books.filter(
      (book) => book.author.toLowerCase() === formik.values.author.toLowerCase()
    );
    if (
      filteredBooks.some(
        (book) => book.title.toLowerCase() === formik.values.title.toLowerCase()
      )
    ) {
      formik.setFieldError(
        "title",
        "A book with this title already exists for the specified author."
      );
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //to avoid clear form on submit then errors
    setFormSubmitted(true);
    event.preventDefault();
    if (await checkDuplicateTitleForAuthor()) return;
    formik.handleSubmit();
  };

  const handleTitleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    formik.setFieldValue("title", value);
  };

  return (
    <div>
      <h1 className="title">Add Book</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleTitleChange}
            value={formik.values.title}
          />
          {formSubmitted && formik.errors.title && (
            <div className="error_text">{formik.errors.title}</div>
          )}
        </div>
        <div className="input_container">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
            min="10"
            max="100"
          />
          {formSubmitted && formik.errors.price && (
            <div className="error_text">{formik.errors.price}</div>
          )}
        </div>
        <div className="input_container">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formSubmitted && formik.errors.description && (
            <div className="error_text">{formik.errors.description}</div>
          )}
        </div>
        <div className="input_container">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.category}
          />
          {formSubmitted && formik.errors.category && (
            <div className="error_text">{formik.errors.category}</div>
          )}
        </div>
        <div>
          <label htmlFor="imageUrl">Upload Image</label>
          <input
            id="imageUrl"
            ref={fileInputRef}
            name="imageUrl"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileInputChange(e, "imageUrl")}
          />
          {formSubmitted && formik.errors.imageUrl && (
            <div className="error_text">{formik.errors.imageUrl}</div>
          )}
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <select
            id="author"
            name="author"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
          >
            <option value="" label="Select an author" />
            {authors.map((author) => (
              <option
                key={author.name}
                value={author.name}
                label={author.name}
              />
            ))}
          </select>
          {formSubmitted && formik.errors.author && (
            <div className="error_text">{formik.errors.author}</div>
          )}
        </div>
        <div className="button_container">
          <button className="submit_button" type="submit">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
