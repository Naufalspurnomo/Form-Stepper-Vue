import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/loginForm.vue";
import Home from "../views/homeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(), // Or createWebHashHistory() if you prefer hash-mode routing
  routes,
});

export default router;
