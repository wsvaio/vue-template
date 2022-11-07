import { RouteRecordRaw } from "vue-router";
import vrouter from "@/components/vrouter/index.vue";



const routes: RouteRecordRaw[] = [
  { path: "/", redirect: { name: "home" } },
  {
    path: "/about", name: "about",
    meta: { title: "about" },
    component: () => import("@/views/about/index.vue"),
  },
  {
    path: "/home", name: "home",
    meta: { title: "home" },
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/:pathMatch(.*)", name: "notfound",
    component: () => import("@/routes/notfound/index.vue")
  }
];




export default routes;
