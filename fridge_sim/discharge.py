import time,sys,json
while True:
    f = open('fridgestatus/' + sys.argv[1] + '.txt', 'r')
    m = json.loads(f.read())
    f.close()
    if m['battery level'] == 0: 
        m['offline'] = True
    else:
        m['using battery'] = True
        m['battery level'] = max(0, m['battery level'] - 5)
    f = open('fridgestatus/' + sys.argv[1] + '.txt', 'w')
    f.write(json.dumps(m))
    f.close()
    if m['battery level'] == 0: 
        exit(0)
    time.sleep(5)
