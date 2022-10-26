
declare module "*.vue" {
  import type { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

// declare module "*.md" {
//   import type { ComponentOptions } from "vue";
//   const Component: ComponentOptions;
//   export default Component;
// }

declare module "~icons*" {
  import type { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_PROJECT_NAME: string
      readonly VITE_BASE: string
      readonly VITE_BASE_API: string

    }
  }
}
