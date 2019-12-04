import amqp, {Channel} from 'amqplib/callback_api';
import {amqp_url} from './constans';
require('dotenv').config();

let cloudAMQP_url: string;

export const channelConnection = async (url: string) => new Promise((resolve, rejects) => {
	cloudAMQP_url = url;
	
	amqp.connect(cloudAMQP_url, async (err, connection) => {
		if(err) rejects(err);
		connection.createChannel(async (err, channelAMQP) => {
			if(err) rejects(err);
			resolve(channelAMQP);
		})
		
	})
});
