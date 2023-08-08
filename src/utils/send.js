#!/usr/bin/env node
//
const amqp = require('amqplib/callback_api');

export const send = (message) => {

    amqp.connect('amqp://localhost', function (err, connection) {
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
            console.log(" [x] Sent %s", msg);
        });
    });
};