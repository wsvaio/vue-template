import { RouteRecordRaw } from "vue-router";
import Admin from "./admin/index.vue";
import vrouter from "@/components/vrouter/index.vue";

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
  {
    path: "list", name: "list",
    meta: { title: "list", icon: "menu" },
    component: () => h(vrouter, { routerKey: true, keepAlive: true  }),
    children: [
      {
        path: "item1", name: "item1",
        meta: { title: "item1", icon: "menu" },
        component: () => import("@/views/list/item1/index.vue"),
    
      },
      {
        path: "item2", name: "item2",
        meta: { title: "item2", icon: "menu" },
        component: () => import("@/views/list/item2/index.vue"),
    
      },
    ]
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