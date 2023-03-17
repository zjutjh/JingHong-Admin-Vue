import Login from "../pages/Login.vue";
import SchoolBus from "../pages/SchoolBus.vue";
import TermTime from "../pages/TermTime.vue";
import Announcement from "../pages/Announcement.vue";
import LostfoundPage from "../pages/LostfoundPage/index.vue";
import Layout from "../pages/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store";
import getUserInfoAPI from "../apis/UserAPI/getUserInfo";

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登陆",
      requestAuth: false,
    },
    component: Login,
  },
  {
    path: "/",
    name: "Layout",
    meta: {
      requestAuth: true,
    },
    component: Layout,
    children: [
      {
        path: "schoolbus",
        name: "SchoolBus",
        meta: {
          title: "校车时间",
          requestAuth: true,
        },
        component: SchoolBus,
      },
      {
        path: "termtime",
        name: "TermTime",
        meta: {
          title: "学期时间",
          requestAuth: true,
        },
        component: TermTime,
      },
      {
        path: "announcement",
        name: "Announcement",
        meta: {
          title: "通知编辑",
          requestAuth: true,
        },
        component: Announcement,
      },
      {
        path: "lostfound",
        name: "Lostfound",
        meta: {
          title: "失物寻物",
          requestAuth: true,
        },
        component: LostfoundPage,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
  if (to.meta.requestAuth) {
    const userStore = useUserStore();
    if (!userStore.userInfo) {
      try {
        if (!localStorage.getItem("passTime")) return "/login";
        // 先检查是否超过7日未登陆
        const lastLoginTime = Number.parseInt(localStorage.getItem("passTime") || "0");
        if (new Date().getTime() - lastLoginTime > 1000 * 60 * 60 * 24 * 7) {
          throw new Error("登陆过期");
        }

        // 请求并写入用户信息
        const { data, code, msg } = await getUserInfoAPI();
        if (code === 1) {
          userStore.login(data.user);
        } else throw new Error(msg);
      } catch (e: any) {
        console.log(`自动登陆状态失败, ${e.message || "未知错误"}`);
        userStore.logout();
        return "/login";
      }
    }
  }
  if (to.path === "/") {
    return routes.find(route => route.path === "/")?.children?.[0] || "/";
  }
  // TDK
  document.title = [to.meta.title, "WeJH-CMS"]
    .filter(item => !!item)
    .join(" | ");
});

export default router;
