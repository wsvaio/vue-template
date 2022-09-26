import type { RouteRecordRaw } from "vue-router";
import { defineComponent } from "vue";


declare module "vue-router" {
  interface RouteMeta {
    title?: string
    icon?: ReturnType<typeof defineComponent>

  }

}

