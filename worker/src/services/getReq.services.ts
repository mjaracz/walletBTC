import {pool} from '../mySQL/config.mysql';
import channelWrapper from '../rabbitMQ';

export async function senderGetReq() {
	await pool()
		.query('SELECT * from tracking_btc')
		.then(async res => await channelWrapper.publish('btc_exchange', 'get.json.btc', res.rows))
		.catch(err => console.log(err.message));
}
