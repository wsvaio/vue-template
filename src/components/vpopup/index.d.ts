import { FormProps, PopupProps } from "vant";

type vpopupCtx = {
  form: obj,
  formProps: Partial<FormProps> & obj,
  popup: Partial<PopupProps> & obj & { slot?: string, name?: string },
  action: (name?: string) => Promise<T>
}
