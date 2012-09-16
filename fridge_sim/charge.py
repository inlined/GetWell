import time,sys,json
while True:
    f = open('fridgestatus/' + sys.argv[1] + '.txt', 'r')
    m = json.loads(f.read())
    f.close()
    if m['battery level'] == 100: exit(0)
    m['using battery'] = False
    m['battery level'] = max(100, m['battery level'] + 5)
    f = open('fridgestatus/' + sys.argv[1] + '.txt', 'w')
    f.write(json.dumps(m))
    f.close()
    time.sleep(5)
