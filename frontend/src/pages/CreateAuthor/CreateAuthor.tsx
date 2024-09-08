import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { authorValidationSchema } from "../../validation/author.schema";
import { useUploadImageFile } from "../../hooks/useUploadImageFile";
import { Author } from "../../types/Author.type";
import { addAuthor } from "../../store/author/author.thunk";
import { authorsSelectors } from "../../store/author/author.selector";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import classes from "./CreateAuthor.module.scss";

export default function CreateAuthor() {
  const authors = useSelector(authorsSelectors.authors);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formik = useFormik<Author>({
    initialValues: {
      name: "",
      age: "",
      country: "",
      pictureUrl: "",
      active: true,
    },
    validationSchema: authorValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (Object.keys(formik.errors).length === 0) {
        try {
          if (!imageFile) return;
          //upload image to firebase on submit
          uploadImageToFirebase(
            imageFile,
            `images/authors/${formik.values.name}}`
          ).then((url) => {
            dispatch(addAuthor({ ...formik.values, pictureUrl: url }));
          });
          clearForm(resetForm as (nextValues?: Partial<Author>) => void);
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

  const checkIfAuthorNameExists = () => {
    if (
      authors.some(
        (author) =>
          author.name.toLocaleLowerCase() ===
          formik.values.name.toLocaleLowerCase()
      )
    ) {
      formik.setFieldError("name", "An author with this name already exits");
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //to avoid clear form on submit then errors
    setFormSubmitted(true);
    event.preventDefault();
    if (await checkIfAuthorNameExists()) return;
    formik.handleSubmit();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.setFieldValue("name", value);
  };

  return (
    <div>
      <h1 className="title">Add Author</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleNameChange}
            value={formik.values.name}
          />
          {formSubmitted && formik.errors.name && (
            <div className="error_text">{formik.errors.name}</div>
          )}
        </div>
        <div className="input_container">
          <label htmlFor="price">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.age}
            onBlur={formik.handleBlur}
            min="20"
            max="120"
          />
          {formSubmitted && formik.errors.age && <div className="error_text">{formik.errors.age}</div>}
        </div>
        <div className="input_container">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.country}
          />
          {formSubmitted && formik.errors.country && (
            <div className="error_text">{formik.errors.country}</div>
          )}
        </div>
        <div className="input_container">
          <label htmlFor="pictureUrl">Upload Picture</label>
          <input
            id="pictureUrl"
            ref={fileInputRef}
            name="pictureUrl"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileInputChange(e, "pictureUrl")}
          />
          {formSubmitted && formik.errors.pictureUrl && (
            <div className="error_text">{formik.errors.pictureUrl}</div>
          )}
        </div>
        <div className="button_container">
          <button className="submit_button" type="submit">
            Add Author
          </button>
        </div>
      </form>
    </div>
  );
}
