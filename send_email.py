import smtplib
from email.message import EmailMessage

def email_alert(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    
    msg['subject'] = subject
    
    msg['to'] = to
    msg['from'] = "YOUR EMAIL"
    user = "YOUR EMAIL"
    password = "APP PASSWORD"
    
    server = smtplib.SMTP("smtp.gmail.com", 587)
    
    server.starttls()
    
    server.login(user, password)
    
    server.send_message(msg)
    
    server.quit()
    
if __name__ is '__main__':
    #email_alert("Works", "Hello World", "mahidhar2099@gmail.com")     # FOR EMAIL SERVICE 
    email_alert("Works", "Hello World", "7203126912@tmomail.net")      # FOR TEXT MESSAGES - USE CARRIER 
    # https://www.digitaltrends.com/mobile/how-to-send-a-text-from-your-email-account/    # use this to find the domain of carrier 
    