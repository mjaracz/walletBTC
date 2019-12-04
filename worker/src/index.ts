import {consumeQueue} from './rabbitMQ';
import {Message} from 'amqplib';
import {msgContent} from './types';
import {senderGetReq} from './services/getReq.services';
import {senderPostReq} from './services/postReq.services';
let msgContent: msgContent;

consumeQueue()
	.then(async (msg: Message) => {
		msgContent = await JSON.parse(Buffer.from(msg.content).toString());
		console.log(msgContent);
		if(msg.fields.routingKey === 'get.json.btc' && msgContent.getReq) await senderGetReq().catch(err => console.warn(err));
		if(msg.fields.routingKey === 'post.json.btc' && msgContent.postReq) await senderPostReq(msgContent).catch(err => console.warn(err));
	});


