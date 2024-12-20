// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "unshackled-1c5fd.firebaseapp.com",
  projectId: "unshackled-1c5fd",
  storageBucket: "unshackled-1c5fd.firebasestorage.app",
  messagingSenderId: "1049246874466",
  appId: "1:1049246874466:web:ed664c9c8bf67481400a3b",
  measurementId: "G-XLTTRYHS9Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);