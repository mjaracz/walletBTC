import mysql from 'mysql';

require('dotenv').config();


export const mysqlPool  =  () => new Promise(resolve => resolve(
	mysql.createPool({
		connectionLimit: 100,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		debug: false
	})
));

export const databasePoolConnection = () => new Promise((resolve, reject) => {
	const pool = mysql.createPool({
		connectionLimit: 100,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		debug: false
	});
	
	pool.getConnection((err, connection) => {
		connection.on('error', (err) => reject(err));
		resolve(connection);
		reject(err);
	})
});
