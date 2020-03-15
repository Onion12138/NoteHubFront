import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Search from "@/components/Search";
import Mine from "@/components/Mine";
import Edit from "@/components/Edit";
import Recommend from "@/components/Recommend";
import Help from "@/components/Help";
import Note from "@/components/Note";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Register from "@/components/LoginView/Register";
import Login from "@/components/LoginView/Login";
import Tree from "@/components/Tree";
import Collect from "@/components/Collect";
import Tag from "@/components/Tag";
Vue.use(VueRouter);

//路由懒加载
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("@/components/Layout/Layout.vue"),
      meta: { requireAuth: true }
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/tag",
      name: "tag",
      component: Tag
    },
    {
      path: "/tree",
      name: "tree",
      component: Tree
    },
    {
      path: "/collect",
      name: "collect",
      component: Collect
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/note",
      name: "note",
      component: Note
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/mine",
      name: "mine",
      component: Mine
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit
    },
    {
      path: "/recommend",
      name: "recommend",
      component: Recommend
    },
    {
      path: "/message",
      name: "message",
      component: Message
    },
    {
      path: "/help",
      name: "help",
      component: Help
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    // 在已登陆的情况下访问登陆页会重定向到首页
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next({ path: to.path || "/" });
    }
  } else {
    // 没有登陆则访问任何页面都重定向到登陆页
    if (to.path === "/login") {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
