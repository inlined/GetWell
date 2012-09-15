import os,json,httplib,time
timestampmap = {}
while True:
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
        filename = 'fridgestatus/' + name + '.txt'
        filetimestamp = "last modified: %s" % time.ctime(os.path.getmtime(filename))
        if not(filename in timestampmap):
            timestampmap[filename] = filetimestamp
            continue
        if timestampmap[filename] == filetimestamp:
            continue
        timestampmap[filename] = filetimestamp
        f = open(filename, 'r')
        data = json.loads(f.read())
        f.close()
        if data['offline']:
            continue;
        towrite = {u'battery': data['battery level'], 'usingBattery' : data['using battery'], u'fridge': {u'className': u'Fridge', u'__type': u'Pointer', u'objectId': data['fridge id']}}
        connection = httplib.HTTPSConnection('api.parse.com', 443)
        connection.connect()
        connection.request('POST', '/1/classes/FridgeStatus',json.dumps(towrite), {
                "X-Parse-Application-Id": "XKfhHQqQzfqP22r5gAcvZWa427AbuJpVHbFXgoOY",
                "X-Parse-REST-API-Key": "EHYR38qIXB1LlozI2y2JZdwCztLJA92lRRDtJ776",
                "Content-Type": "application/json"
                })
        result = json.loads(connection.getresponse().read())
    time.sleep(0.1)
    
    

