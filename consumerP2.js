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

    const queue = "COLA-2";
    const cons_var = "P1";

    try{
        
        const conn = await  amqp.connect(rabbitSettings);
        console.log("Conexión hecha...");

        const channel = await conn.createChannel();
        console.log("Canal creado...");

        const res = await channel.assertQueue(queue);
        console.log("Fila creada...");

        console.log(`Esperando mensaje de ${cons_var}`);
        channel.consume(queue, message => {
            let X = JSON.parse(message.content.toString());
            console.log(`Recibido productor ${X.mensaje}`);
            console.log(X);

            if(X.mensaje == cons_var){
                channel.ack(message);
                console.log("Mensaje eliminado de la lista de espera \n");
            }else{
                console.log("Ese mensaje no es para este consumidor y no se borrará");
            }
            
        })

    }catch(err){
        console.log(`Error => ${err}`);
    }
}