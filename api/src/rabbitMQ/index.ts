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
				await channel.assertExchange('json_exchange', 'topic');
				await channel.assertQueue('get_btc', {durable: true});
				await channel.bindQueue('get_btc', 'json_exchange', 'get.json.btc');
				await channel.consume('get_btc', async msg => {
					await resolve(JSON.parse(Buffer.from(msg.content).toString()))
				});
			}
			catch(e) {
				reject(e);
				console.warn(e.message)
			}
		}
	});
});

const publishMessage = (key, message) => {
	connection.createChannel({
		json: true,
		setup: channel => channel.assertExchange('btc_exchange', 'topic')
	})
		.publish('btc_exchange', key, message)
		.finally(() => console.log('publish message works'));
};

export {
	onListenerQueue,
	publishMessage
};
