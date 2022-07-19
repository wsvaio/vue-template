declare module 'vue' {
  export interface GlobalComponents {

    RouterView: typeof import('vue-router')['RouterView'];
    RouterLink: typeof import('vue-router')['RouterLink'];

  }
}

export { };
