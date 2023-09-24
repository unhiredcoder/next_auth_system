// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFckYuu9FVUk-CGccHkGVr1dfqgmDS4i4",
  authDomain: "next-auth-system-acf0f.firebaseapp.com",
  projectId: "next-auth-system-acf0f",
  storageBucket: "next-auth-system-acf0f.appspot.com",
  messagingSenderId: "523013525820",
  appId: "1:523013525820:web:f1a7b1641d34f5df664e39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}