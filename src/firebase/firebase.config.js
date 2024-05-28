// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQAU3UgdyMiMYfPX1ZIFHZIO02xMDZDAk",
    authDomain: "blog-hub-f132f.firebaseapp.com",
    projectId: "blog-hub-f132f",
    storageBucket: "blog-hub-f132f.appspot.com",
    messagingSenderId: "787348247287",
    appId: "1:787348247287:web:e8e64a407d2ffe5510b9f2",
    measurementId: "G-H8N0GQ8GSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;