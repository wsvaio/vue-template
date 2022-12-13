declare global {
  type vtableCtx = {
    params: obj;
    checkList: obj[];
    refresh: () => void;
  } & vdrawerCtx;
}

export {};
