import {Router} from 'express';
import {
	onListenerQueue,
	publishMessage
} from '../rabbitMQ';

const route = Router();

route.get('/wallet', (req, res) => {
	onListenerQueue()
		.then(message => res.send(message))
});

route.post('/addToWallet',  (req, res) => {
	const {body} = req;
	publishMessage('post.json.btc', body);
	res.send(body)
});

export default route;
