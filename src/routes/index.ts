import { RouteRecordRaw } from "vue-router";
import vrouter from "@/components/vrouter/index.vue";



const routes: RouteRecordRaw[] = [
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
    path: "/:pathMatch(.*)", redirect: { name: "home" },
  }
];




export default routes;