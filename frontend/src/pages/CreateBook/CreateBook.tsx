import React, { useState } from "react";
import { addBook, Book } from "../../services/book.service";
import { useFormik } from "formik";
import { validationSchema } from "../../validation/book.schema";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreateBook() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [imageFile, setImageFile] = useState<File>();

  const authors = [
    { id: "1", name: "Author 1" },
    { id: "2", name: "Author 2" },
    { id: "3", name: "Author 3" },
  ];

  const formik = useFormik<Book>({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      imageUrl: "",
      author: "",
      active: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      uploadFile();
      if (Object.keys(formik.errors).length === 0) {
        console.log("Form submitted:", values);
        setFormSubmitted(false);
        await addBook(values);
        resetForm();
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    formik.handleSubmit();
  };

  const uploadFile = async () => {
    try {
      console.log("val 0",formik.values)

      if (!imageFile) return;
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      formik.setFieldValue("imageUrl", downloadURL);
      console.log("val ",formik.values)
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formSubmitted && formik.errors.title && (
            <div>{formik.errors.title}</div>
          )}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formSubmitted && formik.errors.price && (
            <div>{formik.errors.price}</div>
          )}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formSubmitted && formik.errors.description && (
            <div>{formik.errors.description}</div>
          )}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.category}
          />
          {formSubmitted && formik.errors.category && (
            <div>{formik.errors.category}</div>
          )}
        </div>
        <div>
          <label htmlFor="imageUrl">Upload Image</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="file"
            accept="image/*"
            onChange={(event) => {
              event.currentTarget.files &&
                setImageFile(event.currentTarget.files[0]);
            }}
          />
          {formSubmitted && formik.errors.imageUrl && (
            <div>{formik.errors.imageUrl}</div>
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
              <option key={author.id} value={author.id} label={author.name} />
            ))}
          </select>
          {formSubmitted && formik.errors.author && (
            <div>{formik.errors.author}</div>
          )}
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
