// src/validationSchema.ts
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  imageUrl: Yup.string().required('image is required'),
  author: Yup.string().required('Author is required'),
});

export const validateImage = (file: File | null) => {
    if (!file) return 'Image is required';
  
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) return 'Invalid file type. Only JPEG and PNG are allowed.';
  
    if (file.size > 5 * 1024 * 1024) return 'File size must be less than 5MB.';
  
    return null; // No errors
  };
