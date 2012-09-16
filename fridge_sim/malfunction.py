import time,sys,json
f = open('fridgestatus/' + sys.argv[1] + '.txt', 'r')
m = json.loads(f.read())
f.close()
m["offline"] = True
f = open('fridgestatus/' + sys.argv[1] + '.txt', 'w')
f.write(json.dumps(m))
f.close()

