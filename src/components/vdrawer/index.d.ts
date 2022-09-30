import { DialogProps, DrawerProps, FormProps } from "element-plus";
import { Ref } from "vue";
declare global {
  type vdrawerCtx = {
    drawer: Read<Partial<DrawerProps>> & obj & { show?: boolean, slot?: string };
    form: obj;
    formProps: Read<Partial<FormProps>> & obj;
    submit: (title?: string) => boolean | void;
    loading: Ref<boolean>;
  }


}

export { };