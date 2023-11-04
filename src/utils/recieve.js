import logger from '../config/logger';
import dotenv from 'dotenv';
dotenv.config();

var amqp = require('amqplib/callback_api');

export const receive = () => {

    amqp.connect(`${process.env.RABBITMQ_SERVER}`, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'fundoo';

            channel.assertQueue(queue, {
                durable: false
            });

            logger.info(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

            channel.consume(queue, function (msg) {
                logger.info(` [x] Received  ${msg.content.toString()}`);
            }, {
                noAck: true
            });
        });
    });
}