import { App as app } from "vue";
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




  type App = app;
}

export { };
