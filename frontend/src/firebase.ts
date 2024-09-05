// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU1knQZX3EjewfpAWctIg2pupNImuZqgc",
  authDomain: "books-managment-36c7e.firebaseapp.com",
  projectId: "books-managment-36c7e",
  storageBucket: "books-managment-36c7e.appspot.com",
  messagingSenderId: "671117533201",
  appId: "1:671117533201:web:06aeec9fa058b891ea11b0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firestore = getFirestore(app);

const storage = getStorage(app);

export { firestore, storage };