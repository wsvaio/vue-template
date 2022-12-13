import { RouteRecordRaw } from "vue-router";

import Menu from "~icons/ep/menu";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "home",
    name: "home",
    meta: { title: "Home", icon: Menu },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "about",
    name: "about",
    meta: { title: "About", icon: Menu },
    component: () => import("@/views/about/index.vue"),
  },

  {
    path: "todo",
    name: "todo",
    meta: { title: "todo", icon: Menu },
    component: () => import("@/views/todo/index.vue"),
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "adminLayout",
    redirect: { name: "home" },
    component: () => import("@/routes/admin/index.vue"),
    children: adminRoutes,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("./notfound/index.vue"),
  },
];

export default routes;
