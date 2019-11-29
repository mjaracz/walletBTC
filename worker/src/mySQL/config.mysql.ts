import mysql from 'mysql';
require('dotenv').config();

export const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	debug: false
});

export const databasePoolConnection = () => new Promise((resolve, reject) => {
	pool.getConnections((err, connection) => {
		connection.on('error', (err) => reject(err));
		resolve(connection);
		reject(err);
	})
});
