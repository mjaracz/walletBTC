import {onListenerQueue, publishMessage} from '../rabbitMQ';
import {channelPublish, msg, msgContent} from '../rabbitMQ/types';
let msgWasPublish: boolean;


export const walletServices = () => new Promise(async (resolve, reject) => {
	
	await publishMessage()
		.then((channel: channelPublish) => {
			channel.publish('btc_exchange', 'get.json.btc', {getReq: true})
		})
		.catch(err => {
			reject(err);
			console.warn(err.message);
		})
		.finally(() => msgWasPublish = true);
	
	await (msgWasPublish)
		? onListenerQueue()
				.then((msg: msg) => {
					const msgContent: msgContent = JSON.parse(Buffer.from(msg.content).toString());
					
					(msg.fields.routingKey === 'get.json.btc' && msgContent.getReq)
						? resolve(JSON.stringify(msgContent.btcArray))
						: reject({message: 'resource not found'})
				})
				.catch(err => reject(err))
		: null
});

export const addWalletServices = () => new Promise( async (resolve, reject) => {
	await publishMessage()
		.then((channel: channelPublish) => {
			channel.publish('btc_exchange', 'post.json.btc', {postReq: true})
		});
	
	await onListenerQueue()
		.then((msg: msg) => {
			const msgContent = JSON.parse(Buffer.from(msg.content).toString());
			if(msg.fields.routingKey === 'post.json.btc' && msgContent.postReq) resolve(msgContent)
			
		})
		.catch(err => reject(err))
});
