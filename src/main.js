import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const app = createApp(App);
app.use(Toast, {
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 20,
  newestOnTop: true,
});

app.use(router);
app.mount("#app");
export { app, db };
