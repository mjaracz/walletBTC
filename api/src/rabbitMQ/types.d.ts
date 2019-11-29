export interface msg {
	fields: { routingKey: string };
	content: BinaryType;
}

export type msgContent = {
	getReq: boolean;
	btcArray: wallet[];
}

export interface wallet {
	id: number;
	btc: string;
}

export interface channelPublish {
	publish: (exchange: string, routingKey: string, data: object) => Promise<object>
}
