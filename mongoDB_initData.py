from pymongo import MongoClient
import datetime
import bcrypt

client = MongoClient('mongodb+srv://<username>:<password>@cluster0.tmwwaer.mongodb.net/?retryWrites=true&w=majority')

# Create a database
db = client.disasterResponse

#print(client.list_database_names())


# Create a users table
usersTable = db.users

#print(db.list_collection_names())

hashed_password = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())

userDocument = {
    "name": { "first": "Test", "last": "User" },
    "username": "test001",
    "password": hashed_password,
    "address": { "door": "1475", "street name": "Folsom Street", "apt": "U157", "city": "Boulder", "state": "Colorado", "zip": 80302 },
    "phone": 7201234567,
    "email": "testuser@gmail.com",
    "preference": { "contact": True, "alerts": True }


}

usersTable.insert_one(userDocument)

# Create an authorities table

authoritiesTable = db.authorities

#print(db.list_collection_names())

hashed_password = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())

authorityDocument = {
    "name": { "first": "Test", "last": "Authority" },
    "username": "test101",
    "password": hashed_password,
    "city": "Boulder",
    "state": "Colorado",
    "email": "testuser@gmail.com"

}

authoritiesTable.insert_one(authorityDocument)


# Create a rescue team table

rescueTable = db.rescue

#print(db.list_collection_names())

hashed_password = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())

rescueDocument = {
    "name": { "first": "Test", "last": "Rescue" },
    "username": "test201",
    "password": hashed_password,
    "city": "Boulder",
    "state": "Colorado",
    "phone": 7201234567,
    "email": "testuser@gmail.com",
    "availability": True


}

rescueTable.insert_one(rescueDocument)


# print(people.insert_one(personDocument))

# people.find_one({ "name.last": "Turing" })