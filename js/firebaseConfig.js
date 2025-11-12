import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {getFirestore, addDoc, collection, getDocs, getDoc, doc, updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-FsnOMvcvNVCWn2LlIa8zUGulyV4JxsA",
  authDomain: "foro-proyecto.firebaseapp.com",
  projectId: "foro-proyecto",
  storageBucket: "foro-proyecto.firebasestorage.app",
  messagingSenderId: "373593213239",
  appId: "1:373593213239:web:0982e7273efdc52cf732b2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, addDoc, collection, getDocs, getDoc, doc, updateDoc, arrayUnion};
