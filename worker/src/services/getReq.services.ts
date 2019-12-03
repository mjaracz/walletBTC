import {mysqlPool} from '../mySQL/config.mysql';
import {Pool} from 'mysql';

export async function senderGetReq() {
	await mysqlPool()
		.then((pool: Pool) => pool.query('select * from tracking_btc'))
}
