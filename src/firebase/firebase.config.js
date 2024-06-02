// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWaF6zvsHolUUCG_P1dFY5XTD-84TODo8",
    authDomain: "chatbot-58fef.firebaseapp.com",
    projectId: "chatbot-58fef",
    storageBucket: "chatbot-58fef.appspot.com",
    messagingSenderId: "386782281121",
    appId: "1:386782281121:web:5b96ece6ed09ffec40dfe0",
    measurementId: "G-WYBS0QFYPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;