import requests
from bs4 import BeautifulSoup
import json

liste = {}
res = requests.get("https://dbanimes.com/anime/naruto-shippuden-vostfr/")
if res.ok :
	soup = BeautifulSoup(res.text,"html.parser")
	ul = soup.findAll("div", {"class": "card-body"})
	for i in ul : 
		liste_lien = []
		a = i.findAll("a")
		for x in range(1,len(a)):
			print(a[x])
			print(a[x]["title"].find("Naruto"))
			print(a[x]["title"])
			if(a[x]["title"].find("Naruto")) >-1:
				liste_lien.append(a[x]["href"])
			cpt = 1
		print(liste_lien)
