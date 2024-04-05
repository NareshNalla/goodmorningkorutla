// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtk5HznKZlZ_G8xUz0o_XdKFO-SCf_KHg",
  authDomain: "news-666.firebaseapp.com",
  projectId: "news-666",
  storageBucket: "news-666.appspot.com",
  messagingSenderId: "503598812101",
  appId: "1:503598812101:web:9c0295271e43346bfa19ac",
  measurementId: "G-PN5MSYZ60B"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
export const imageDb = getStorage(app);