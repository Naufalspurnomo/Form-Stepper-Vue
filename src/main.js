import { createApp } from "vue";
import router from "./router";
// import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI8n5FKGGkqIaXzcqxlfno8gVjtr91BGI",
  authDomain: "sanqua-form-login.firebaseapp.com",
  databaseURL: "https://sanqua-form-login-default-rtdb.firebaseio.com",
  projectId: "sanqua-form-login",
  storageBucket: "sanqua-form-login.appspot.com",
  messagingSenderId: "573654771693",
  appId: "1:573654771693:web:0f42e471147185eb0e29e4",
  measurementId: "G-496SCMRQC1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// import Home from "./components/home.vue";
// import Login from "./components/loginForm.vue";

// const routes = [
//   { path: "/login", component: Login },
//   { path: "/home", component: Home },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

createApp(App).use(router).mount("#app");
