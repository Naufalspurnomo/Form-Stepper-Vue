import { createApp } from "vue";
import router from "./router";
// import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
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
