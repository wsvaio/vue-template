import { RouteRecordRaw } from "vue-router";
import Admin from "./admin/index.vue";
import { Menu } from "@element-plus/icons-vue";
import vrouter from "@/components/vrouter/index.vue";

export const adminRoutes: RouteRecordRaw[] = [

  {
    path: "home", name: "home",
    meta: { title: "Home", icon: Menu },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "about", name: "about",
    meta: { title: "About", icon: Menu },
    component: () => import("@/views/about/index.vue"),

  },
  {
    path: "list", name: "list",
    meta: { title: "list", icon: Menu },
    children: [
      {
        path: "item3", name: "item3",
        meta: { title: "item3", icon: Menu },
        children: [
          {
            path: "item4", name: "item4",
            meta: { title: "item4", icon: Menu },
            component: () => import("@/views/list/item4/index.vue"),

          },
          {
            path: "item5", name: "item5",
            meta: { title: "item5", icon: Menu },
            // component: () => import("@/views/list/item5/index.vue"),
            children: [
              {
                path: "item1", name: "item1",
                meta: { title: "item1", icon: Menu },
                component: () => import("@/views/list/item1/index.vue"),

              },
              {
                path: "item2", name: "item2",
                meta: { title: "item2", icon: Menu },
                component: () => import("@/views/list/item2/index.vue"),

              },
            ]

          },
        ]
      },
      {
        path: "item1", name: "item1",
        meta: { title: "item1", icon: Menu },
        component: () => import("@/views/list/item1/index.vue"),

      },
      {
        path: "item2", name: "item2",
        meta: { title: "item2", icon: Menu },
        component: () => import("@/views/list/item2/index.vue"),

      },

    ]
  },

  {
    path: "todo", name: "todo",
    meta: { title: "todo", icon: Menu },
    component: () => import("@/views/todo/index.vue"),
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
