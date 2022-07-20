import { RouteRecordRaw } from "vue-router";
import Default from "./default/index.vue";
import KeepAlive from "./keep-alive/index.vue";
import RouterView from "./router-view/index.vue";

export const layoutMap: RouteRecordRaw[] = [

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
    path: '/', name: 'default', redirect: { name: "home" },
    component: Default, children: [...layoutMap],
  },
  {
    path: '/login', name: 'login',
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/:pathMatch(.*)", name: "notfound",
    component: () => import("./notfound/index.vue")
  }
];




export default routes;