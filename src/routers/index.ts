import Login from "../pages/Login.vue";
import SchoolBus from "../pages/SchoolBus.vue";
import TermTime from "../pages/TermTime.vue";
import Announcement from "../pages/Announcement.vue";
import Information from "../pages/Information.vue";
import LostfoundPage from "../pages/LostfoundPage/index.vue";
import Dashboard from "../pages/Dashboard/index.vue";
import Layout from "../components/Layout.vue";
import SuitApply from "../pages/SuitApply/index.vue";
import suitManger from "@/pages/SuitApply/suitManger.vue";
import suitImport from "@/pages/SuitApply/suitImport.vue";
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
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          title: "Dashboard"
        },
        component: Dashboard
      },
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
      {
        path: "information",
        name: "Information",
        meta: {
          title: "校园资讯",
          requestAuth: true,
        },
        component: Information,
      },
      {
        path: "suitapply",
        name: "SuitApply",
        meta: {
          title: "物资借用",
          requestAuth: true,
        },
        component: SuitApply,
      },
      // {
      //   path: "suitFaq",
      //   name: "SuitFaq",
      //   meta: {
      //     title: "问答页面",
      //     requestAuth: true,
      //   },
      //   component:
      // },
      {
        path: "suitManger",
        name: "SuitManger",
        meta: {
          title: "审批清点",
          requestAuth: true,
        },
        component: suitManger
      },
      {
        path: "suitImport",
        name: "suitImport",
        meta: {
          title: "导入借用信息",
          requestAuth: true,
        },
        component: suitImport,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
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
  // TDK
  document.title = [to.meta.title, "WeJH-CMS"]
    .filter(item => !!item)
    .join(" | ");
});

export default router;
