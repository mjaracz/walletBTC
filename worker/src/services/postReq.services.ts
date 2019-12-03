import {mysqlPool} from '../mySQL/config.mysql';
import {Pool} from 'mysql';

export async function senderPostReq(msgContent) {
	mysqlPool()
		.then((pool: Pool) => pool.query(`insert into tracking_btc (btc) values ?`, [msgContent.rows]))
		.then(res => console.log(res))
		.catch(err => console.log(`[mySQL] query error ${err.message}`))
}
