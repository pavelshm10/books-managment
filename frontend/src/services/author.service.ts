// src/services/bookService.ts
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export interface Author {
  name: string;
  age: string;
  country: string;
  pictureUrl: string;
  active?: boolean;
}

async function addAuthor(author: Author): Promise<void> {
  try {
    const docRef = await addDoc(collection(firestore, "authors"), author);
    console.log("Author written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

export { addAuthor };
