import json,httplib,random,sys
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('GET', '/1/classes/Fridge', '', {
       "X-Parse-Application-Id": "XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
       "X-Parse-REST-API-Key": "EHYR38qIXB1LlozI2y2JZdwCztLJA92lRRDtJ776"
     })
result = json.loads(connection.getresponse().read())
for x in result['results']:
    name = x['name']
    name = name.replace(' ', '').capitalize()
    f = open('fridgestatus/' + name + '.txt', 'w')
    if len(sys.argv) == 1:
        threshold = 100
    else:
        threshold = int(sys.argv[1])
    r = random.randint(0,100)
    if r > threshold:
        using_battery = True 
    else: 
        using_battery = False 
    towrite = json.dumps({'fridge id':x['objectId'], 'using battery':using_battery, 'battery level': random.randint(0,100), 'offline':False})
    f.write(towrite)
    f.close()
    

    
