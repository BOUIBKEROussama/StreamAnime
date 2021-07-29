import requests
from bs4 import BeautifulSoup
import json

liste = {}
for cpt in range(1,149):
	res = requests.get("https://dbanimes.com/hunter-x-hunter-2011-"+str(cpt)+"-vostfr/")
	if res.ok :
		soup = BeautifulSoup(res.text,"html.parser")
		ul = soup.find_all("li", class_="streamer")
		print(ul)
		print()
		
		for i in ul : 
			L = []
			a = i.find("div")
			b = str(a)
			for j in b.split():
				if j.find("SRC") >= 0 :
					L.append(j[4:])
				if j.find("src") >= 0 :
					L.append(j[4:])
			for k in L :
				if k.find("dood.to") >=0 :
					c = []
					c.append("hunter-x-hunter-2011 episode "+str(cpt)+" VOSTFR")
					c.append(k)
					liste[int(cpt)] = c
					break
		print(cpt)
print(liste)
with open('HxHJSON.json', 'w') as outfile:
    json.dump(liste, outfile)

	
