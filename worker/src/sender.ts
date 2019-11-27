import {wallet} from './types'
import {pool} from './postgreSQL/postgresql.config';
import channelWrapper from './index';

async function sender() {
	await pool
		.query('SELECT * from tracking_btc')
		.then(res => res.rows.map(async (row: wallet) =>
			await channelWrapper.publish('json_exchange', 'get.json.btc', row)
		))
		.catch(err => console.log(err.message));
}

export default sender;
