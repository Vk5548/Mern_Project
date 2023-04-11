import pprint
from flask import Flask
from pymongo import MongoClient
from bson.son import SON
from bson.objectid import ObjectId
import gridfs
from flask import request
import json
from bson import json_util
from bson.objectid import ObjectId
import base64


app = Flask(__name__)
db = MongoClient().Vehicles

@app.route('/')
def index():
    return 'Welcome to BGG Search !!'

@app.route('/globalSearch', methods=['POST'] )
def global_search():
    #read string from frontend ["search string" either `county` or `electric vehicle type`]
    data = request.json
    county = data['county']
    evt = data['evt']
    
    #mongo regex query
    query = {
        "$or": [
                {{'County':
                {
                '$regex': ""          
                }},
                {'ElectricVehicleType':
                    {
                        '$regex': evt+'*'
                    }} }
            ,
                {'County':
                {
                '$regex': county+"*"          
                }},
                {'ElectricVehicleType':
                    {
                        '$regex': evt+'*'
                    }} 
            ]

              
    }
    result = db.electric.find(query)
    response = []
    for each_record in result:
        each_record["_id"] = str(each_record["_id"])
        response.append(each_record)
    #response = json.dumps(list(result))


    #return array of records
    resp = json.dumps({"data":{"information":response}})
    return resp

@app.route('/globalLocationSearch', methods=['POST'] )
def global_location_search():
    #read string from frontend [ "lat,long" , "within"]
    data = request.json
    latitude = float(data['latitude'])
    longitude = float(data['longitude'])
    range = int(data['range'])


    #mongo near query
    query = {
    'location': {
        '$near': {
            '$geometry': {
                'type': 'Point',
                'coordinates': [longitude, latitude]
                },
                '$maxDistance': range
            }
        }
    }
    
    result = db.Geoelectric.find(query)
    response = []
    for each_record in result:
        each_record["_id"] = str(each_record["_id"])
        response.append(each_record)

    #return array of records
    return json.dumps({"data":{"information":response}})

@app.route('/filteredSearch', methods=['POST'])
def global_filtered_search():
    #read string from frontend [ "_id "]
    data = request.json
    id = data['id']
    
    
    #mongo `_id` query in both (Geo and non geo and comments) collection along with images & comments.
    # READ TEXT
    query = {"_id": ObjectId(id)}
    projection = {"_id":0,"electricid":0,"geoelectricid":0}
    result = db.electric.find_one(query,projection) # 6434a14c1ddccaf26f511c6b
    if result == None:
        query = {"_id": ObjectId(id)}
        result = db.Geoelectric.find_one(query,projection) # 6434a12a922325bc63ec5604

    # READ IMAGE
    fs = gridfs.GridFS(db)
    metadata = db.fs.files.find_one({'electricid': ObjectId(id)})
    print(metadata)
    if len(metadata) == 0:
        metadata = db.fs.files.find_one({'geoelectricid': ObjectId(id)})
        print("Inside IFF")
        print(metadata)
    if len(metadata) == 0:
        metadata = db.fs.files.find_one({'geoelectricid':0})
        print("DEFAULT")
        print(metadata)
    grid_out = fs.get(metadata['_id'])
    image_content = str(base64.b64encode(grid_out.read()))
    print(image_content)


    #return text + image + comments
    return json.dumps({"data":{"image": image_content,"information":result}})

@app.route('/addComments', methods=['POST'])
def add_comments():
    #read string from frontend [ "_id "]
    data = request.json
    id = data['id'] 
    comment = data['comments']
    
    #mongo add in existing collection either add or update.
    query = {"_id":ObjectId(id)}
    update_criteria = {"$push":  {"comments": comment}}
    result = db.electric.find_one_and_update(query, update_criteria) # 6434a14c1ddccaf26f511c6a
    print(result)
    if result == None:
        query = {"_id": ObjectId(id)}
        update_criteria = {"$push":  {"comments": comment}}
        result = db.Geoelectric.update_one(query, update_criteria) # 6434a12a922325bc63ec5604
        print(result)
        print("HERERERE")
    
    if result == None:
        msg = "Failure to update"
    else:
        msg = "Successfully updated"

    #return boolean
    return json.dumps({"data":{"message":msg}})



app.run(host='0.0.0.0', port=81)