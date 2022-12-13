import { setGlobalOptions } from "vue-request";
setGlobalOptions({
  pagination: {
    currentKey: "page",
    pageSizeKey: "pageSize",
    totalKey: "count",
  },
});
