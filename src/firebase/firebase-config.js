import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL8e2zYe-nTWLBvLxZXOS4WvF7OgwSMGU",
  authDomain: "qr-database-5fe7d.firebaseapp.com",
  projectId: "qr-database-5fe7d",
  storageBucket: "qr-database-5fe7d.appspot.com",
  messagingSenderId: "665240166989",
  appId: "1:665240166989:web:d88586b5fd2f452d56f204",
  measurementId: "G-F2QZG1W3QH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
