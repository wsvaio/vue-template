import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    alias: "/home",
    meta: { title: "home" },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "about" },
    component: () => import("@/views/about/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("@/routes/notfound/index.vue"),
  },
];

export default routes;
