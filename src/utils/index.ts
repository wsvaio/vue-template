import { createEventBus } from "@wsvaio/utils";

export const log = console.log;

export const bus = createEventBus();

export const runFunctions =
  (...funs: Function[]) =>
  (...args: any[]) =>
    funs.forEach(fun => fun(...args));

export const tryingSync = <T>(
  tryCallBack: () => T,
  catchCallBack?: (error: unknown) => any,
  finallyCallBack?: () => any
) => {
  try {
    return tryCallBack();
  } catch (error) {
    catchCallBack && catchCallBack(error);
  } finally {
    finallyCallBack && finallyCallBack();
  }
};
