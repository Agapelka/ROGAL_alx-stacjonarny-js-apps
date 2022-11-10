// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8UFxkicPTdvRXsRS-8Mkeii_o8wqPxb0",
  authDomain: "chatdamianalxstacjonarny.firebaseapp.com",
  projectId: "chatdamianalxstacjonarny",
  storageBucket: "chatdamianalxstacjonarny.appspot.com",
  messagingSenderId: "414910309701",
  appId: "1:414910309701:web:d1c39eca7f2ac833338a2c",
  databaseURL: "https://chatdamianalxstacjonarny-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);