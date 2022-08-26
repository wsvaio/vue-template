import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia();
// pinia 持久化
pinia.use(piniaPluginPersist);

export default (app: App) => app.use(pinia);

