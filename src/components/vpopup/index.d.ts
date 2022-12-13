import { FormProps, PopupProps, FormInstance } from "vant";

declare global {
  type vpopupCtx = {
    form: Partial<FormProps>;
    popup: Partial<PopupProps>;
    payload: Record<any, any> & { $show?: boolean; $slot?: string; $name?: string };
    loading: boolean;
    act: (options?: string | vpopupCtx["payload"]) => Promise<any>;
    vanFormRef?: FormInstance;
  };
}
