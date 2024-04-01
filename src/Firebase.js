// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuE9p-ILUfKYkcs-Y3naZ65DNbXKkeJJc",
    authDomain: "aula-reactnative-22-02.firebaseapp.com",
    databaseURL: "https://aula-reactnative-22-02-default-rtdb.firebaseio.com",
    projectId: "aula-reactnative-22-02",
    storageBucket: "aula-reactnative-22-02.appspot.com",
    messagingSenderId: "468529772886",
    appId: "1:468529772886:web:ba5442192d5639a190bef7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;