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
    user = "user email"
    password = "google generated password"
    
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password) 
    server.send_message(msg)
    
    server.quit()

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

db = client.disasterResponse

drTable = db.disasterCheckin

userstable = db.users


# Establish connection with RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='alert_insertions', durable=True)

# Function to handle incoming messages
def callback(ch, method, properties, body):
    
    user_data = json.loads(body)
    drTable.insert_one(user_data)
    print("Updated user data in the disasterCheckin table")

    # Find the user id from users table based on the _id primary key

    output = userstable.find_one({'username': user_data["userid"]}, {"username": 1, "email": 1})
    print(output)

    content = f"""Given the current/upcoming weather conditions in your city, we want to ensure you are safe.
                /n Please respond to the alert here: localhost:3000/disasterCheckin/{output["username"]}
                /n Your safety is our priority, and we're here to assist in any way we can. """

    email_alert("[URGENT] Disaster Checkin", content, output["email"])
    print(f"Sent email to {output['username']}")



channel.basic_qos(prefetch_count=1)
# Set up consumer to listen to the queue
channel.basic_consume(queue='alert_insertions',
                      on_message_callback=callback,
                      auto_ack=True)

print("Waiting for messages...")
channel.start_consuming()