import connection from './connect';
import receiver from '../receiver';

connection.on('connect', () =>
	console.log('[AMQP] rabbitMQ is connect')
);
connection.on('disconnect', (err) =>
	console.log('[AMQP] rabbitMQ is disconnect, err ' + err)
);

const channelWrapper = connection.createChannel({
	json: true,
	setup: async channel => {
		try {
			await channel.prefetch(1);
			await channel.assertExchange('btc_exchange', 'topic');
			await channel.assertQueue('btc', {autoDelete: false, autoAck: false});
			await channel.bindQueue('btc', 'btc_exchange', 'post.json.btc');
			await channel.bindQueue('btc', 'btc_exchange', 'get.json.btc');
			await channel.consume('btc', receiver);
		}
		catch(e) {
			console.warn(`[AMQP] channel error: ${e.message}`)
		}
	}
});

export default channelWrapper;
