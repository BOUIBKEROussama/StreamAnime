import requests
from bs4 import BeautifulSoup
import json

liste = {}
cpt = 366
res = requests.get("https://www.otakufr.com/Bleach-Vostfr")
if res.ok :
	soup = BeautifulSoup(res.text,"html.parser")
	ul = soup.find_all("a", class_="lst")
	
	for i in ul :
		res = requests.get(i["href"])
		if(res.ok):
			soup = BeautifulSoup(res.text,"html.parser")
			spans = soup.findAll("div", {"class": "nav_ver"})
			for j in spans :
				#print(j)
				a = j.findAll('a')
				res1 = requests.get(a[1]["href"])
				if res1.ok :
					soup2 = BeautifulSoup(res1.text,"html.parser")
					iframe = soup2.findAll("iframe")
					for x in iframe :
						if  cpt != 331 and cpt != 101 :
							if x["src"].find("stream")>=0 :
								liste[cpt] = ["Bleach episode " + str(cpt) + " vostfr",x["src"]]
				cpt = cpt - 1
			print(liste)

with open('Bleach.json', 'w') as outfile:
    json.dump(liste, outfile)