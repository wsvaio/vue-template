import { App as app, Ref } from "vue";
import { FormProps, PopupProps } from "vant";

declare global {

  type T = any;
  type obj = { [k: string]: any; };
  type keys<K extends keyof any, T = any> = {
    [P in K]: T;
  } & obj;


  type Read<T> = {
    -readonly [K in keyof T]: T[K]
  };



  type vpopupCtx = {
    form: obj,
    formProps: Partial<FormProps> & obj,
    popup: Partial<PopupProps> & obj & { slot?: string, name?: string },
    action: (name?: string) => Promise<T>
  }

  type App = app;
}

export { };
