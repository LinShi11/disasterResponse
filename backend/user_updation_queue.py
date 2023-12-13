import pika
import json
import time

from pymongo import MongoClient
import datetime
import bcrypt

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

db = client.disasterResponse

usersTable = db.users


# Establish connection with RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-container', 5672))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='updations_queue', durable=True)

# Function to handle incoming messages
def callback(ch, method, properties, body):
    
    user_data = json.loads(body)
    
    usersTable.delete_one({"username": user_data.get("username")})
    
    user_data["password"] = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
    usersTable.insert_one(user_data)

    print("Updated user data in MongoDB")

channel.basic_qos(prefetch_count=1)
# Set up consumer to listen to the queue
channel.basic_consume(queue='updations_queue',
                      on_message_callback=callback,
                      auto_ack=True)

print("Waiting for messages...")
channel.start_consuming()