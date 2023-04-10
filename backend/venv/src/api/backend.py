import pprint
from flask import Flask
from pymongo import MongoClient
db = MongoClient().Vehicles
from bson.son import SON
from bson.objectid import ObjectId
import gridfs
from flask import request
import json

app = Flask(__name__)

@app.route('/')
def index():
    return 'Welcome to BGG Search !!'

@app.route('/globalSearch', methods=['POST'])
def global_search():
    #read string from frontend ["search string" either `county` or `electric vehicle type`]
    data = json.load(request.get_json())
    county = data['county']
    evt = data['evt']

    
    #mongo regex query
    query = {
        'County':
            {
                '$regex': county+'* '
            },
        'ElectricVehicleType':
            {
                '$regex': evt+'*'
            }   
    }
    result = db.electric.find(query)
    for each_record in result:
        pprint.pprint(each_record)


    #return array of records
    return "global search"

@app.route('/globalLocationSearch', methods=['POST'])
def global_search():
    #read string from frontend [ "lat,long" , "within"]
    data = json.load(request.get_json())
    latitude = data['latitude']
    longitude = data['longitude']
    range = data['range']


    #mongo near query
    query = {"location": SON([("$near", [longitude, latitude]), ("$maxDistance", range)])}
    result = db.Geoelectric.find(query)
    for each_record in result:
        pprint.pprint(each_record)

    #return array of records
    return "global location search"

@app.route('/filteredSearch', methods=['POST'])
def global_search():
    #read string from frontend [ "_id "]
    data = json.load(request.get_json())
    id = data['id']
    
    
    #mongo `_id` query in both (Geo and non geo and comments) collection along with images & comments.
    # READ IMAGE
    fs = gridfs.GridFS(db)
    metadata = db.electricimg.find_one({'electricid': id})
    if len(metadata) == 0:
        metadata = db.electricimg.find_one({'geoelectricid': id})
    grid_out = fs.get(metadata['file_id'])
    image_content = grid_out.read()

    # READ TEXT
    query = {"electricid": id}
    result = db.electric.find_one(query)
    print(result)

    query = {"geoelectricid": id}
    result = db.Geoelectric.find_one(query)
    print(result)


    #return text + image + comments
    return "filtered search"

@app.route('/addComments', methods=['POST'])
def global_search():
    #read string from frontend [ "_id "]
    data = json.load(request.get_json())
    id = data['id']
    comment = data['comments']
    
    #mongo add in existing collection either add or update.
    record = [{"comments":comment}]
    query = {"electricid": id}, {"$push": {"annotations": record}}
    result = db.electric.update_one(query, upsert=True)
    print(result)

    query = {"geoelectricid": id}, {"$push": {"annotations": record}}
    result = db.Geoelectric.update_one(query, upsert=True)
    print(result)

    #return boolean
    return "add comments True/ False"



app.run(host='0.0.0.0', port=81)