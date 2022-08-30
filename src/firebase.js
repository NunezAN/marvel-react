// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzzdIx6Jn2WV5RWtUAmjS0bJSJrJTW83U",
  authDomain: "marvel-1b3e8.firebaseapp.com",
  projectId: "marvel-1b3e8",
  storageBucket: "marvel-1b3e8.appspot.com",
  messagingSenderId: "428041804434",
  appId: "1:428041804434:web:34315fcc46e0af897de44b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
