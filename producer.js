const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'gianestevez',
    password: 'gianestevez',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

async function connect(){

    const queue = "COLA-1";
    const queue2 = "COLA-2";
    const messages = [ 
        
    { "mensaje": "P1", "en": "X", "timestamp": Date.now() },
    { "mensaje": "P1", "en": "Y", "timestamp": Date.now() },
    { "mensaje": "P2", "en": "Y", "timestamp": Date.now() },
    { "mensaje": "C1", "en": "X", "timestamp": Date.now() },
    { "mensaje": "C2", "en": "Y", "timestamp": Date.now() },
    { "mensaje": "C3", "en": "X", "timestamp": Date.now() },
    { "mensaje": "C3", "en": "Y", "timestamp": Date.now() }

    ]

    try{
        
        const conn = await  amqp.connect(rabbitSettings);
        console.log("Conexión hecha...");

        const channel = await conn.createChannel();
        console.log("Canal creado...");

        const res = await channel.assertQueue(queue);
        console.log("Fila creada...");

        for(let message in messages){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(messages[message])));
            console.log(`Mensaje enviado a la cola ${queue}`)
        }

        const res2 = await channel.assertQueue(queue2);
        console.log("Fila creada...");


        for(let message in messages){
            await channel.sendToQueue(queue2, Buffer.from(JSON.stringify(messages[message])));
            console.log(`Mensaje enviado a la cola ${queue2}`)
        }

    }catch(err){
        console.log(`Error => ${err}`);
    }
}