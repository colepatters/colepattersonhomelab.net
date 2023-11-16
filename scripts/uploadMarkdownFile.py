import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import os

basePath = os.path.dirname(os.path.realpath(__file__))
cred = credentials.Certificate(basePath + '/service-account-key.json')
firebaseApp = firebase_admin.initialize_app(cred)
db = firestore.client()

with open(basePath + '/source.md', 'r') as file_in:
    lines = []
    for line in file_in:
        lines.append(line)
        
pageID = input("Enter page ID: ")
pageTitle = input("Enter page title: ")
pageShortDesc = input("Enter page short description: ")

doc = db.collection('pages').document(pageID)

doc.set({
    "created": firestore.SERVER_TIMESTAMP,
    "updated": firestore.SERVER_TIMESTAMP,
    "title": pageTitle,
    "shortDesc": pageShortDesc,
    "markdown": lines
})

print('done.')