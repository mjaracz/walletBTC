import {Router} from 'express';
import {addWalletServices, walletServices} from '../services/wallet.services';

const route = Router();

route.get('/wallet', async (req, res) => {
	walletServices()
		.then(msgFromRabbit => {
			res.send(msgFromRabbit)
		})
		.catch(err => res.status(404).statusMessage = err.message)
});

route.post('/addToWallet',  (req, res) => {
	addWalletServices(req.body)
		.then(msgFromRabbit => {
			res.send(msgFromRabbit)
		})
		.catch(err => res.status(404).statusMessage = err.message)
});

export default route;
