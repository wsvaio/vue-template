import * as $apis from "@/apis";
import * as $utils from "@/utils";
import $bus from "@/utils/EventBus";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $apis: typeof $apis;
    $utils: typeof $utils;
    $bus: typeof $bus;


  }
}


export default (app: App) => Object.assign(app.config.globalProperties, {
  $apis, $utils, $bus

});



