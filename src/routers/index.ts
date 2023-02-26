import Login from "../pages/Login.vue";
import BusTime from "../components/BusTime.vue";
import TermTime from "../components/TermTime.vue";
import Edit from "../components/Edit.vue";
import Layout from "../pages/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { canUserAccess } from "../utils/canUserAccess";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "bustime",
        name: "BusTime",
        component: BusTime,
      },
      {
        path: "termtime",
        name: "TermTime",
        component: TermTime,
      },
      {
        path: "edit",
        name: "Edit",
        component: Edit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.name !== "Login") {
    const isLoginInStore = window.localStorage.getItem("isLogin");
    const res = await canUserAccess();
    if (!res || isLoginInStore !== "true") {
      window.localStorage.setItem("isLogin", "false");
      return "/login"
    }
  }
});

export default router;
