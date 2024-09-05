// src/services/bookService.ts
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export interface Book {
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: '';
  author: '';
  active?: boolean;
}

async function addBook(book: Book): Promise<void> {
  try {
    console.log("in");
    const docRef = await addDoc(collection(firestore, "books"), book);
    console.log("Book written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

export { addBook };
