import logger from '../config/logger';
import dotenv from 'dotenv';
dotenv.config();
const amqp = require('amqplib/callback_api');

export const send = (message) => {

    amqp.connect(`${process.env.RABBITMQ_SERVER}`, function (err, connection) {
        if (err) {
            throw new Error(err);
        }
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1;
            }
            var queue = 'fundoo';
            var msg = message;
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            logger.info(` [x] Sent ${msg}`);
        });
    });
};