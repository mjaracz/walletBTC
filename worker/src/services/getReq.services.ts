import {mysqlPool} from '../mySQL/config.mysql';
import {Pool} from 'mysql';
import {publishToQueue} from '../rabbitMQ';

export async function senderGetReq() {
	await mysqlPool()
		.then(async (pool: Pool) => {
			const data = await new Buffer(pool.query('select * from tracking_btc').values);
			await publishToQueue('get.json.btc', data)
				.catch(err => console.warn(err))
		})
}
