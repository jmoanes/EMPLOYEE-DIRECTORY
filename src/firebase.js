// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFjzFUkvGZXdXtPo8jtmJFn9Q-dbLRzsU",
  authDomain: "table-support.firebaseapp.com",
  projectId: "table-support",
  storageBucket: "table-support.firebasestorage.app",
  messagingSenderId: "847262772049",
  appId: "1:847262772049:web:01fe8d61be3940c1430170",
  measurementId: "G-HFZ4Z7T08D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
