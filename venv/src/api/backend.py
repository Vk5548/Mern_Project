from flask import Flask
from pymongo import MongoClient
db = MongoClient().Vehicles

app = Flask(__name__)

@app.route('/')
def index():
    return 'Welcome to BGG Search !!'

@app.route('/globalSearch', methods=['POST'])
def global_search():
    #read string from frontend ["search string" either `county` or `electric vehicle type`]
    #mongo regex query

    #return array of records
    return "global search"

@app.route('/globalLocationSearch', methods=['POST'])
def global_search():
    #read string from frontend [ "lat,long" , "within"]
    #mongo near query
    #return array of records
    return "global location search"

@app.route('/filteredSearch', methods=['POST'])
def global_search():
    #read string from frontend [ "_id "]
    #mongo `_id` query in both (Geo and non geo and comments) collection along with images & comments.
    #return text + image + comments
    return "filtered search"

@app.route('/addComments', methods=['POST'])
def global_search():
    #read string from frontend [ "_id "]
    #mongo add in existing collection either add or update.
    #return boolean
    return "add comments True/ False"



app.run(host='0.0.0.0', port=81)