import pika
import json

from pymongo import MongoClient
import datetime
import bcrypt

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

db = client.disasterResponse

usersTable = db.users


# Establish connection with RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='sign_up_queue', durable=True)

# Function to handle incoming messages
def callback(ch, method, properties, body):
    user_data = json.loads(body)
    usersTable.insert_one(user_data)

    print("Inserted user data into MongoDB")

channel.basic_qos(prefetch_count=1)
# Set up consumer to listen to the queue
channel.basic_consume(queue='sign_up_queue',
                      on_message_callback=callback,
                      auto_ack=True)

print("Waiting for messages...")
channel.start_consuming()