import { RouteRecordRaw } from "vue-router";
import Admin from "./admin/index.vue";


export const adminRoutes: RouteRecordRaw[] = [

  {
    path: "home", name: "home",
    meta: { title: "Home", icon: "menu" },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "about", name: "about",
    meta: { title: "About", icon: "menu" },
    component: () => import("@/views/about/index.vue"),

  },

];


const routes: RouteRecordRaw[] = [
  {
    path: "/", name: "admin", redirect: { name: "home" },
    component: Admin, children: adminRoutes,
  },
  {
    path: "/login", name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/:pathMatch(.*)", name: "notfound",
    component: () => import("./notfound/index.vue")
  }
];




export default routes;