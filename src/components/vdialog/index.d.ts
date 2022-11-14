import { DialogProps, DrawerProps, FormProps, FormInstance } from "element-plus";
declare global {

  type vdialogCtx = {
    dialog: Read<Partial<DialogProps>> & { show?: boolean, slot?: string };
    form: Read<Partial<FormProps>>;
    payload: obj & { name?: string };
    loading: boolean;
    action: (options?: string | obj) => Promise<any>;
    elFormRef?: FormInstance,
  }



}

export { };



