import { DialogProps, DrawerProps, FormProps, FormInstance } from "element-plus";
import { Ref } from "vue";
declare global {
  type vdrawerCtx = {
    drawer: Read<Partial<DrawerProps>> & { show?: boolean; slot?: string };
    form: Read<Partial<FormProps>>;
    payload: obj & { name?: string };
    loading: boolean;
    action: (options?: string | obj) => Promise<any>;
    elFormRef?: FormInstance;
  };
}

export {};
