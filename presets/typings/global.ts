import { App as app, Ref } from "vue";
import { DialogProps, DrawerProps, FormProps } from "element-plus";

declare module "vue" {
  export interface GlobalComponents {



  }
}

declare global {




  type T = any;
  type obj = { [k: string]: any; };
  type keys<K extends keyof any, T = any> = {
    [P in K]: T;
  } & obj;


  type Read<T> = {
    -readonly [K in keyof T]: T[K]
  };

  type vtableCtx = {
    params: obj;
    checkList: obj[];
    refresh: () => void;
  } & vdrawerCtx;

  type vdrawerCtx = {
    drawer: Read<Partial<DrawerProps>> & obj & { show?: boolean, slot?: string };
    form: obj;
    formProps: Read<Partial<FormProps>> & obj;
    submit: (title?: string) => boolean | void;
    loading: Ref<boolean>;
  }
  type vdialogCtx = {
    dialog: Read<Partial<DialogProps>> & obj & { show?: boolean, slot?: string };
    form: obj;
    formProps: Read<Partial<FormProps>> & obj;
    submit: (title?: string) => boolean | void;
    loading: Ref<boolean>;
  }

  type App = app;
}

export { };