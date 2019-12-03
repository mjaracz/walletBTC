import {msg, msgContent} from './types';
import {senderGetReq} from './services/getReq.services';
import {senderPostReq} from './services/postReq.services';

async function receiver (msg: msg) {
	const msgContent: msgContent = await JSON.parse(Buffer.from(msg.content).toString());
	if (msg.fields.routingKey === 'get.json.btc' && msgContent.getReq) await senderGetReq();
	if (msg.fields.routingKey === 'post.json.btc' && msgContent.postReq) await senderPostReq(msgContent);
}

export default receiver;
