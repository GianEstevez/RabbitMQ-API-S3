#!/usr/bin/env python
import pika, sys, os

queue = 'UIS_JS'

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.queue_declare(queue=queue)

    def callback(ch, method, properties, body):
        print(f"[PY] Recibido {body} por el canal {queue}")

    channel.basic_consume(queue=queue, on_message_callback=callback, auto_ack=True)

    print('[PY] Esperando mensajes. Use CTRL+C para salir')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)