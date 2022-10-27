#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const queue = 'UIS_PY'

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log('[JS] Esperando mensajes. Use CTRL+C para salir');
        channel.consume(queue, function (msg) {
            console.log(" [JS] Recibido %s desde ", msg.content.toString(), queue);
        }, {
            noAck: true
        });
    });

});

