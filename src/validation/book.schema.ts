import * as Yup from "yup";

export const bookValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(10, "Price must be at least 10")
    .max(100, "Price must be at most 100"),
  description: Yup.string().required("Description is required"),
  //   category: Yup.string().required("Category is required"),
  imageUrl: Yup.string().required("Image is required"),
  author: Yup.string().required("Author is required"),
});
