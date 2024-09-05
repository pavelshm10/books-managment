import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { addAuthor, Author } from "../../services/author.service";
import { authorValidationSchema } from "../../validation/author.schema";
import { useUploadImageFile } from "../../hooks/useUploadImageFile";

export default function CreateAuthor() {
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
            addAuthor({ ...formik.values, pictureUrl: url });
          });
          clearForm(resetForm);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //to avoid clear form on submit then errors
    console.log("ss");
    event.preventDefault();
    setFormSubmitted(true);
    formik.handleSubmit();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    //TODO:check name exits in authors
    formik.setFieldValue("name", value);
  };

  return (
    <div>
      <h1>Add Author</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleNameChange}
            value={formik.values.name}
          />
          {formSubmitted && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>
        <div>
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
          {formSubmitted && formik.errors.age && <div>{formik.errors.age}</div>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.country}
          />
          {formSubmitted && formik.errors.country && (
            <div>{formik.errors.country}</div>
          )}
        </div>
        <div>
          <label htmlFor="imageUrl">Upload Picture</label>
          <input
            id="pictureUrl"
            ref={fileInputRef}
            name="pictureUrl"
            type="file"
            accept="image/*"
            onChange={(e)=>handleFileInputChange(e,'pictureUrl')}
          />
          {formSubmitted && formik.errors.pictureUrl && (
            <div>{formik.errors.pictureUrl}</div>
          )}
        </div>
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}
