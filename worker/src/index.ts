import connection from './rabbitMQ/connect';
import receiver from './receiver';
import sender from './sender';

connection.on('connect', () =>
	console.log('[AMQP] rabbitMQ is connect')
);
connection.on('disconnect', (err) =>
	console.log('[AMQP] rabbitMQ is disconnect, err ' + err.message)
);

const channelWrapper = connection.createChannel({
	json: true,
	setup: async channel => {
		try {
			await channel.prefetch(1);
			await channel.assertExchange('btc_exchange', 'topic');
			await channel.assertQueue('btc', {exclusive: true, autoDelete: false});
			await channel.bindQueue('btc', 'btc_exchange', 'post.json.btc');
			await channel.consume('btc', receiver);
		}
		catch(e) {
			console.warn(`[AMQP] channel error: ${e.message}`)
		}
	}
});


channelWrapper
	.waitForConnect()
	.then(() => {
		sender().catch(err => console.log(err.message));
		console.log('[AMGP] Sender send data to queue');
		console.log('[AMQP] Receiver listen on the messages')
	})
	.catch(err => {
		console.warn(err.message);
		channelWrapper.close();
		connection.close();
	});

export default channelWrapper;
