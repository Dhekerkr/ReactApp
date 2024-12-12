// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4M7jAFFTv7pVKF6v6mUALTZ1axnv3aKM",
  authDomain: "recipes-site-ba946.firebaseapp.com",
  projectId: "recipes-site-ba946",
  storageBucket: "recipes-site-ba946.firebasestorage.app",
  messagingSenderId: "111856724289",
  appId: "1:111856724289:web:eb3a27ad2b0273dbc719c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);