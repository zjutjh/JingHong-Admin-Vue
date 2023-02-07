import Login from "../pages/Login.vue";
import SchoolBus from "../components/SchoolBus.vue";
import TermTime from "../components/TermTime.vue";
import Announcement from "../components/Announcement.vue"
import Layout from "../pages/Layout.vue";
import SchoolBusChange from "../components/SchoolBusChange.vue";
import { createRouter, createWebHistory } from "vue-router";
import {useLoginStore} from "../store/index"
import pinia from "../store/store"

const store = useLoginStore(pinia);
let is_login:boolean=store.is_login;

const routes = [
  {
    path: "/",
    meta: {
      requestAuth: false,
    },
    redirect: "/Login",
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      requestAuth: false,
    },
    component: Login,
  },
  {
    path: "/SchoolBus",
    name: "SchoolBus",
    meta: {
      requestAuth: true,
    },
    components: {
      'default': Layout,
      'right': SchoolBus,
    },
  },
  {
    path: "/TermTime",
    name: "TermTime",
    meta: {
      requestAuth: true,
    },
    components: {
      'default': Layout,
      'right': TermTime,
    },
  },
  {
    path: "/Announcement",
    name: "Announcement",
    meta: {
      requestAuth: true,
    },
    components: {
      'default': Layout,
      'right': Announcement,
    },
  },
  {
    path: "/SchoolBusChange",
    name: "SchoolBusChange",
    meta: {
      requestAuth: true,
    },
    components: {
      'default': Layout,
      'right': SchoolBusChange,
    },
  },
  {
    path: "/SchoolBusAdd",
    name: "SchoolBusAdd",
    meta: {
      requestAuth: true,
    },
    components: {
      'default': Layout,
      'right': SchoolBus,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  is_login=store.is_login;
  if (to.meta.requestAuth && localStorage.token!="success") {
    next({name: "Login"});
    console.log(is_login);
  } else {
    next();
  }
})

// router.beforeEach((to, from) => {
//   if (to.meta.requiresAuth && !auth.isLoggedIn()) {
//     return {
//       path: '/login',
//       query: { redirect: to.fullPath },
//     }
//   }
// })

export default router;
