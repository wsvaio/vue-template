import { DialogProps, FormProps, FormInstance } from "element-plus";
declare global {
  type vdialogCtx = {
    dialog: Writeable<Partial<DialogProps>> & { show?: boolean; slot?: string };
    form: Writeable<Partial<FormProps>>;
    payload: obj & { name?: string };
    loading: boolean;
    action: (options?: string | obj) => Promise<any>;
    elFormRef?: FormInstance;
  };
}

export {};
