// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6s8os1b7Lspgv8MuQactxBFWwuoPGl1Q",
  authDomain: "assetverse-99de6.firebaseapp.com",
  projectId: "assetverse-99de6",
  storageBucket: "assetverse-99de6.firebasestorage.app",
  messagingSenderId: "484014369770",
  appId: "1:484014369770:web:ddb2a6af72edd26b80a093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)