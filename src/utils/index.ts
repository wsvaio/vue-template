import { createEventBus } from "wsvaio";
export { showToast, showDialog, showNotify, showImagePreview, showSuccessToast, showFailToast, showLoadingToast, showConfirmDialog } from "vant";

export const EventBus = createEventBus();

export const log = console.log;

