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
import Register from "@/components/LandingView/Register";
import Login from "@/components/LandingView/Login";
import Tree from "@/components/Tree";
import Collect from "@/components/Collect";
import MindMap from "@/components/MindMap";
import Tag from "@/components/Tag";
Vue.use(VueRouter);

//路由懒加载
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/home",
      component: () => import("@/components/Layout/BasicLayout.vue"),
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: "tag",
          name: "tag",
          component: Tag
        },
        {
          path: "tree",
          name: "tree",
          component: Tree
        },
        {
          path: "collect",
          name: "collect",
          component: Collect
        },
        {
          path: "note",
          name: "note",
          component: Note
        },
        {
          path: "search",
          name: "search",
          component: Search
        },
        {
          path: "mine",
          name: "mine",
          component: Mine
        },
        {
          path: "edit",
          name: "edit",
          component: Edit
        },
        {
          path: "recommend",
          name: "recommend",
          component: Recommend
        },
        {
          path: "message",
          name: "message",
          component: Message
        },
        {
          path: "help",
          name: "help",
          component: Help
        },
        {
          path: "chat",
          name: "chat",
          component: Chat
        },
        {
          path: "mindMap",
          name: "mindMap",
          component: MindMap
        }
      ]
    },
    {
      path: "/auth",
      name: "langding-layout",
      redirect: "/auth/login",
      component: () => import("@/components/Layout/LandingLayout.vue"),
      children: [
        {
          path: "register",
          name: "register",
          component: Register
        },
        {
          path: "login",
          name: "login",
          component: Login
        }
      ]
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

//未登录，跳转到登陆页
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      if (to.path === "/auth/login" || to.path === "/auth/register") {
        next();
      } else {
        console.log("no token");
        next({
          path: "/auth/login",
          query: { redirect: to.fullPath }
        });
      }
    }
  } else {
    next();
  }
});

export default router;
