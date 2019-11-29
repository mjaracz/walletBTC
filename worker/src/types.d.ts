export interface wallet {
  id: number;
  btc: string;
}

export interface msg {
  fields: { routingKey: string };
  content: BinaryType;
}

export type msgContent = {
  getReq?: boolean;
  postReq?: boolean;
  btcArray: wallet[];
}

export interface wallet {
  id: number;
  btc: string;
}
