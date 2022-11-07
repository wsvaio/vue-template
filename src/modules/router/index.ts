import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes";
import { Progress } from "wsvaio";




export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes
});


router.beforeEach(() => Progress.start());


// 添加keepalive
router.beforeEach((to, from, next) => {
  const { nameList } = $(mainStore());
  nameList.add(to.name);
  next();
});
// 缓存页面滚动条距离
router.beforeEach((to, from, next) => {
  if (!from.name) return next();
  const { scrollTopCache, nameList } = $(mainStore());
  const scrollTop = document.documentElement.scrollTop;
  // 只缓存keepalive的页面
  if (nameList.has(from.name)) {
    scrollTopCache.set(from.name, scrollTop);
  }
  next();
});


// 设置标题
router.afterEach((to, from) => {
  document.title = to.meta?.title ?? document.title;
});
// 恢复页面滚动条距离
router.afterEach((to, from) => {
  if (!to.name) return;
  const { scrollTopCache, nameList } = $(mainStore());
  const scrollTop = scrollTopCache.get(to.name);
  nextTick(() => window.scrollTo({ top: scrollTop }));
});



router.afterEach(() => Progress.clear());



export default (app: App) => app.use(router);



