import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FormikProps } from "formik";
import { storage } from "../firebase";

export const useUploadImageFile = <T extends object>(
  formik: FormikProps<T>,
  fileInputRef: React.RefObject<HTMLInputElement>
) => {
  const [imageFile, setImageFile] = useState<File | null>(null); // ImageFile state
  let [formSubmitted, setFormSubmitted] = useState(false);

  const uploadImageToFirebase = async (
    imageFile: File,
    storagePath: string
  ): Promise<string> => {
    const storageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    formik.setFieldValue("imageUrl", downloadURL);
    return downloadURL;
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      //only to pass validation the upload itself will be in submission
      formik.setFieldValue(fieldName, "image selected");
      setImageFile(selectedFile);
    }
  };

  const clearForm = (resetForm: any) => {
    setFormSubmitted(false);
    resetForm(resetForm);
    if (!fileInputRef.current) return;
    fileInputRef.current.value = "";
  };

  return {
    uploadImageToFirebase,
    handleFileInputChange,
    clearForm,
    setFormSubmitted,
    imageFile,
    formSubmitted,
  };
};
