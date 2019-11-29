import {Router} from 'express';
import {addWalletServices, walletServices} from '../services/wallet.services';

const route = Router();

route.get('/wallet', async (req, res) => {
	console.log(req.params.valueOf());
	walletServices()
		.then(msgFromRabbit => {
			res.send(msgFromRabbit)
		})
		.catch(err => res.status(404).statusMessage = err.message)
});

route.post('/addToWallet',  (req, res) => {
	addWalletServices()
		.then(msgFromRabbit => {
			res.send(msgFromRabbit)
		})
		.catch(err => res.status(404).statusMessage = err.message)
});

export default route;
