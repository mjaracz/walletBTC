import connection from './connect';

connection.on('connect', () =>
	console.log('[AMQP] rabbitMQ is connect')
);
connection.on('disconnect', (err) =>
	console.log('[AMQP] rabbitMQ is disconnect, err ' + err.message)
);

const onListenerQueue = () => new Promise((resolve, reject) => {
	connection.createChannel({
		json: true,
		setup: async channel => {
			try {
				await channel.prefetch(1);
				await channel.assertExchange('btc_exchange', 'topic');
				await channel.assertQueue('btc', {exclusive: true, autoDelete: false});
				await channel.bindQueue('btc', 'btc_exchange', 'get.json.btc');
				await channel.bindQueue('btc', 'btc_exchange', 'post.json.btc');
				await channel.consume('btc', msg => resolve(msg));
			}
			catch(e) {
				reject(e);
				console.warn(e.message)
			}
		}
	});
});

const publishMessage = () => new Promise(resolve => {
	resolve(connection.createChannel({
		json: true,
		setup: channel => channel.assertExchange('btc_exchange', 'topic')
	}));
});

export {
	onListenerQueue,
	publishMessage
};
