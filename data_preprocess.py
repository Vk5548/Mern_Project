import json
f = open('data.csv', 'r')
data = json.load(f)

for row in data:
    print(row['Vehicle Location'])