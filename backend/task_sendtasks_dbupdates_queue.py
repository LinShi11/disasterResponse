import pika
import json
import smtplib
from email.message import EmailMessage
from pymongo import MongoClient

def email_alert(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    
    msg['subject'] = subject
    msg['to'] = to
    msg['from'] = "email"
    user = "user name"
    password = "google generated password"
    
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password) 
    server.send_message(msg)
    
    server.quit()

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

db = client.disasterResponse

drTable = db.rescue

# Establish connection with RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-service', 5672))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='task_insertions', durable=True)

# Function to handle incoming messages
def callback(ch, method, properties, body):
    
    user_data = json.loads(body)
    print("Updated team data in the rescue table")
    output = drTable.find_one({'username': user_data["username"]}, {"username": 1, "email": 1})

    content = f"""{user_data["message"]}
                Please respond to the task here: http://localhost:3000/taskCheckin/{output["username"]}/{user_data['task']}"""

    email_alert("[URGENT] Tasks Checkin", content, output["email"])
    print(f"Sent email to {output['username']}")



channel.basic_qos(prefetch_count=1)
# Set up consumer to listen to the queue
channel.basic_consume(queue='task_insertions',
                      on_message_callback=callback,
                      auto_ack=True)

print("Waiting for messages...")
channel.start_consuming()