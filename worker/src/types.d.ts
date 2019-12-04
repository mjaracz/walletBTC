export interface wallet {
  id: number;
  btc: string;
}

export type msgContent = {
  getReq?: boolean;
  postReq?: boolean;
  btcArray: wallet[];
}
