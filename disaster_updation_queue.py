import pika
import json
from pymongo import MongoClient

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

db = client.disasterResponse

usersTable = db.users
drTable = db.disasterCheckin


# Establish connection with RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='checkin_updations', durable=True)

# Function to handle incoming messages
def callback(ch, method, properties, body):
    
    user_data = json.loads(body)
    
    uname = user_data['username']
    checkin = user_data['message']

    userinfo = usersTable.find_one({'username': uname}, {'_id': 1})

    drTable.update_one({'userid': userinfo}, {'$set': {'helpNeeded': checkin}})

    print("Updated user preference in disasterCheckin table")

channel.basic_qos(prefetch_count=1)
# Set up consumer to listen to the queue
channel.basic_consume(queue='checkin_updations',
                      on_message_callback=callback,
                      auto_ack=True)

print("Waiting for messages...")
channel.start_consuming()