import { createEventBus } from "@wsvaio/utils";

export {
  showToast,
  showDialog,
  showNotify,
  showImagePreview,
  showSuccessToast,
  showFailToast,
  showLoadingToast,
  showConfirmDialog,
} from "vant";

export const log = console.log;

export const bus = createEventBus();
