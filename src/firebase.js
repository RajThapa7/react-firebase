import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAuth, onAuthStateChanged  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0tqkxfq1y_VRPqgf-9covhsevOZ4Krok",
  authDomain: "note-app-501b2.firebaseapp.com",
  projectId: "note-app-501b2",
  storageBucket: "note-app-501b2.appspot.com",
  messagingSenderId: "498066236047",
  appId: "1:498066236047:web:c476d84a3a93be34b8c6fa",
  measurementId: "G-DWB4ZBRXSY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default getFirestore();

