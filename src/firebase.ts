import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAU1knQZX3EjewfpAWctIg2pupNImuZqgc",
  authDomain: "books-managment-36c7e.firebaseapp.com",
  projectId: "books-managment-36c7e",
  storageBucket: "books-managment-36c7e.appspot.com",
  messagingSenderId: "671117533201",
  appId: "1:671117533201:web:06aeec9fa058b891ea11b0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();