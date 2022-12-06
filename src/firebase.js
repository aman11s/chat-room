import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqMPddxibLd1qSXyknnCUxCd23yEDUWeM",
  authDomain: "chathouse-ab495.firebaseapp.com",
  projectId: "chathouse-ab495",
  storageBucket: "chathouse-ab495.appspot.com",
  messagingSenderId: "18392855642",
  appId: "1:18392855642:web:ebf0874a3d62dbfcb91463",
};

// Initialize App
initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth();

export { auth };
