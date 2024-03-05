// Import the necessary Firebase modules
import { initializeApp } from "http://www.gstatic.com/firebase.js/9.8.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "http://www.gstatic.com/firebase.js/9.8.2/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  update,
} from "http://www.gstatic.com/firebase.js/9.8.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI8n5FKGGkqIaXzcqxlfno8gVjtr91BGI",
  authDomain: "sanqua-form-login.firebaseapp.com",
  projectId: "sanqua-form-login",
  storageBucket: "sanqua-form-login.appspot.com",
  messagingSenderId: "573654771693",
  appId: "1:573654771693:web:0f42e471147185eb0e29e4",
  measurementId: "G-496SCMRQC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const buttonSignin = document;.getElementById("button_signin")
const buttonSignup = document;.getElementById("button_signup")

buttonSignup.addEventListener('click'(e)=>{
    let name = document.getElementById("name").value
    let nohp = document.getElementById("nohp").value
    let emailSignup = document.getElementById("email_signup").value
    let passwordSignup = document.getElementById("psw_signup").value

    createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
        const user = userCredential.user;
    }),
    then(() =>{
        alert("User Created");
    })
    .catch((error) => {
        alert(error);
    }
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })

})
