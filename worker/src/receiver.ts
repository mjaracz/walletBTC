import {wallet} from './types'
import {pool} from './postgreSQL/postgresql.config';
import channelWrapper from './index';


async function receiver (btc) {
  const queueJSON: wallet = await JSON.parse(Buffer.from(btc.content).toString());
	await pool
		.query(`ALTER SEQUENCE tracking_btc_id_seq, tracking_btc_pkey RESTART`)
		.catch(err => console.warn(err.message))
		.finally(() => console.log('alter works'));
	await pool
		.query(`INSERT INTO tracking_btc (btc) VALUES ('${queueJSON.btc}')`)
		.catch(err => console.warn(err.message))
		.finally(() => console.log('INSERT works'));
	await channelWrapper.ackAll();
}

export default receiver;
