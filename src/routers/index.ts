import Login from "../pages/Login.vue";
import BusTime from "../components/BusTime.vue";
import TermTime from "../components/TermTime.vue";
import Edit from "../components/Edit.vue"
import Layout from "../pages/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/Login"
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Layout",
    name: "Layout",
    components: {
      'default': Layout,
      'right': BusTime,
    }
  },
  {
    path: "/Layout",
    name: "BusTime",
    components: {
      'default': Layout,
      'right': BusTime,
    }
  },
  {
    path: "/Layout",
    name: "TermTime",
    components: {
      'default': Layout,
      'right': TermTime,
    }
  },
  {
    path: "/Layout",
    name: "Edit",
    components: {
      'default': Layout,
      'right': Edit,
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
