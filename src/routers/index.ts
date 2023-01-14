import Home from "../pages/Home.vue";
import Layout from "../pages/Layout.vue";
import Layout2 from "../pages/Layout2.vue";
import Layout3 from "../pages/Layout3.vue";
import Layout4 from "../pages/Layout4.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/Layout",
    name: "Layout",
    component: Layout
  },
  {
    path: "/Layout2",
    name: "Layout2",
    component: Layout2
  },
  {
    path: "/Layout3",
    name: "Layout3",
    component: Layout3
  },
  {
    path: "/Layout4",
    name: "Layout4",
    component: Layout4
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
