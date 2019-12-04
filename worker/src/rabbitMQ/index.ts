import {channelConnection} from './channel';
import {Channel} from 'amqplib/callback_api';
import {amqp_url} from './constans';

export const publishToQueue = async (routingKey: string, data: Buffer) => await channelConnection(amqp_url)
	.then(async (channel: Channel) => {
		await channel.bindQueue('wallet', 'btc.topic', '');
		await channel.assertExchange('btc.topic', 'topic');
		await channel.publish('btc.topic', routingKey, data)
	})
	.catch(err => console.warn(err));

export const consumeQueue = async () => await new Promise((resolve, rejects) => {
	channelConnection(amqp_url)
		.then(async (channel: Channel) => {
			await channel.assertQueue('wallet');
			await channel.consume('wallet', (msg) => resolve(msg));
		})
		.finally(() => console.log('channel works'))
		.catch(err => {
			rejects(err);
		})
	
});

process.on('exit', (close: any) => {
	channelConnection(amqp_url)
		.then((channel: Channel) => channel.close)
		.catch(err => console.warn(err.message));
});
