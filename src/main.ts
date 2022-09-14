import vrouter from "@/components/vrouter/index.vue";
const app = createApp(h(vrouter, { keep: true }));

const modules = import.meta.glob<true, string, T>("@/modules/*/index.ts", { eager: true });
for (const module of Object.values(modules)) module?.default && module.default(app);

app.mount("#app");