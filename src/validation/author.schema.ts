// src/validationSchema.ts
import * as Yup from "yup";

export const authorValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number") 
    .required("Age is required") 
    .positive("Age must be a positive number") 
    .integer("Age must be an integer") 
    .min(20, "Age must be at least 20")
    .max(120, "Age be at most 120"), 
  country: Yup.string().required("Category is required"),
  pictureUrl: Yup.string().required("Picture is required"),
});
