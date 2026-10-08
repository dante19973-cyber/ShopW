// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCu1E4HcOZElQdI8lfCIIelX0GxBqVok-E",
    authDomain: "mendus-657ae.firebaseapp.com",
    databaseURL: "https://mendus-657ae-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mendus-657ae",
    storageBucket: "mendus-657ae.firebasestorage.app",
    messagingSenderId: "233177452491",
    appId: "1:233177452491:web:3a7bf43aa9deb01ecaf04e",
    measurementId: "G-DDQ9SPYS1Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const analytics = getAnalytics(app);
