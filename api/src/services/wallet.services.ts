import {consumeQueue, publishToQueue} from '../rabbitMQ';
import {Message} from 'amqplib';
import {Channel} from 'amqplib/callback_api';
import {msgContent} from '../rabbitMQ/types';


export const walletServices = () => new Promise(async (resolve, reject) => {
	const data = {getReq: true};
	await publishToQueue('get.json.btc', new Buffer(data.toString()));
	
	await consumeQueue()
		.then((msg: Message) => {
			const msgContent: msgContent = JSON.parse(Buffer.from(msg.content).toString());
			
			(msg.fields.routingKey === 'get.json.btc' && msgContent.getReq)
				? resolve(JSON.stringify(msgContent.btcArray))
				: reject({message: 'resource not found'})
		})
		.catch(err => reject(err))
});

export const addWalletServices = (body) => new Promise( async (resolve, reject) => {
	const data = {rows: body};
	await consumeQueue()
		.then((channel: Channel) => {
			channel.publish('btc_exchange', 'post.json.btc', new Buffer(data.toString()))
		})
		.catch(err => reject(err.message))
		.finally(() => resolve(data))
});
