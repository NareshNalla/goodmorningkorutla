// Firebase setup for Good Morning Korutla
// Project: news-666 (existing project, keeps all current data)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtk5HznKZlZ_G8xUz0o_XdKFO-SCf_KHg",
  authDomain: "news-666.firebaseapp.com",
  projectId: "news-666",
  storageBucket: "news-666.appspot.com",
  messagingSenderId: "503598812101",
  appId: "1:503598812101:web:9c0295271e43346bfa19ac",
  measurementId: "G-PN5MSYZ60B",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
