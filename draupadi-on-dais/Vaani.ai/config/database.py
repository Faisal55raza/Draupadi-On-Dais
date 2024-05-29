import os

from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Loading .env variables
load_dotenv()
MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASS = os.getenv("MONGO_PASS")

uri = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.rugd5iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi("1"))

# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Successfully connected to MongoDB!")
    db = client.students_db
    collection = db["dd_chat"]
except Exception as e:
    print(e)
