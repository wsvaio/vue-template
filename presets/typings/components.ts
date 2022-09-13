import { App as app, Ref } from "vue";
import { FormProps, PopupProps } from "vant";


declare module "vue" {
  export interface GlobalComponents {

    RouterView: typeof import("vue-router")["RouterView"];
    RouterLink: typeof import("vue-router")["RouterLink"];

  }
}

declare global {

  type vpopupCtx = {
    form: obj,
    formProps: Partial<FormProps> & obj,
    popup: Partial<PopupProps> & obj & { slot?: string, name?: string },
    action: (name?: string) => Promise<T>
  }

  type App = app;
}

export { };
