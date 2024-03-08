import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/loginForm.vue";
import Home from "../views/homeView.vue";
import Before from "../views/beforeLoginView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/before",
    name: "Before",
    component: Before,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = checkIfUserIsAuthenticated();
    if (!isAuthenticated) {
      next({ name: "Before" });
    } else {
      next();
    }
  } else {
    next();
  }
});

function checkIfUserIsAuthenticated() {
  return localStorage.getItem("userLoggedIn") === "true"; // Mengasumsikan Anda menyimpan status login pengguna di local storage
}

export default router;
