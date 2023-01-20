// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyKAjJaRab0x4g4Dh7AriuJQCI_kwA-wk",
  authDomain: "myapp-b2100.firebaseapp.com",
  projectId: "myapp-b2100",
  storageBucket: "myapp-b2100.appspot.com",
  messagingSenderId: "336343904997",
  appId: "1:336343904997:web:d80cdea421390d58ed9a0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
