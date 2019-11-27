import amqp from 'amqp-connection-manager'
import dotenv from 'dotenv';
dotenv.config();
const connection = amqp.connect([process.env.amqp_URL]);

export default connection;
