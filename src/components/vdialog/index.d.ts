import { DialogProps, DrawerProps, FormProps } from "element-plus";
import { Ref } from "vue";
declare global {

  type vdialogCtx = {
    dialog: Read<Partial<DialogProps>> & obj & { show?: boolean, slot?: string };
    form: obj;
    formProps: Read<Partial<FormProps>> & obj;
    submit: (title?: string) => boolean | void;
    loading: Ref<boolean>;
  }



}

export { };