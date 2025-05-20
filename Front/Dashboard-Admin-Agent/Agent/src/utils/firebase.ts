// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdRKPxMRW9USS_R69calZ1hGoGCsUOpWU",
  authDomain: "spothome-bb209.firebaseapp.com",
  projectId: "spothome-bb209",
  storageBucket: "spothome-bb209.firebasestorage.app",
  messagingSenderId: "694499339254",
  appId: "1:694499339254:web:d8b1d15b9bb0f85167b5d7",
  measurementId: "G-JKNL973SVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};