// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-13c73.firebaseapp.com",
  projectId: "mern-auth-13c73",
  storageBucket: "mern-auth-13c73.appspot.com",
  messagingSenderId: "176240184622",
  appId: "1:176240184622:web:2f082ea414d1874a52febf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
