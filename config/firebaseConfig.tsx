// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-kids-story-generator-f549a.firebaseapp.com",
  projectId: "ai-kids-story-generator-f549a",
  storageBucket: "ai-kids-story-generator-f549a.appspot.com",
  messagingSenderId: "514524705073",
  appId: "1:514524705073:web:6d052e6f59f41eb044c010",
  measurementId: "G-4M087SKBJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)