// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzSLviiMpE1RbwdJQ5M3D0p28I622Aceg",
  authDomain: "korutla-666.firebaseapp.com",
  projectId: "korutla-666",
  storageBucket: "korutla-666.appspot.com",
  messagingSenderId: "1013896062309",
  appId: "1:1013896062309:web:0030d3cbc516e4e2862d8c",
  measurementId: "G-TS571Z12QX"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
export const imageDb = getStorage(app);