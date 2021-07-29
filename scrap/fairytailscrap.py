import requests
from bs4 import BeautifulSoup
import json

liste = {}
res = requests.get("https://dbanimes.com/anime/1-fairy-tail-vostfr/")
if res.ok :
	soup = BeautifulSoup(res.text,"html.parser")
	ul = soup.findAll("div", {"class": "card-body"})
	#print(ul)
	print()
	for i in ul : 
		liste_lien = []
		a = i.findAll("a")
	
		for x in range(1,len(a)):

			if(a[x]["title"].find("Fairy")) >-1:
				liste_lien.append(a[x]["href"])
		cpt = 1
		
		for y in liste_lien:
			res2 = requests.get(y)
			if res2.ok :
				soup = BeautifulSoup(res2.text,"html.parser")
				
				ul2 = soup.find_all("li", class_="streamer")
				
				
				for i in ul2 :
					L = []
					a = i.find("div")
					b = str(a)
					
					for j in b.split():
						if j.find("SRC") >= 0 :
							L.append(j[4:])
							print(j[4:])
						if j.find("src") >= 0 :
							L.append(j[4:])
					
					for k in L :
						if k.find("dood.to") >=0 :
							c = []
							c.append("Fairy Tail episode "+str(cpt)+" VOSTFR")
							c.append(k)
							liste[cpt] = c
							break
			cpt = cpt + 1
			print(cpt)
with open('FairyTail.json', 'w') as outfile:
    json.dump(liste, outfile)

	
