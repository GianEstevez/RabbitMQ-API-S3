#!/usr/bin/env python
import pika

queue = 'UIS_PY'

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue=queue)

body = input('Inserte que va a publicar: ')
channel.basic_publish(exchange='',
                      routing_key=queue,
                      body=body)
print(f" [PY] Enviado {body} por el canal {queue}")
connection.close()
