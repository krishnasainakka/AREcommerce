// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "arecommerce-4b51d.firebaseapp.com",
  projectId: "arecommerce-4b51d",
  storageBucket: "arecommerce-4b51d.appspot.com",
  messagingSenderId: "773882184615",
  appId: "1:773882184615:web:4a2c2a3841dd048cccac82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);