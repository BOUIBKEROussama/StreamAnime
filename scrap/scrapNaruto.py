import requests
from bs4 import BeautifulSoup
import json


def selector(url,finder,finder2):#connection au site internet
	res = requests.get(url)
	if res.ok :
		soup = BeautifulSoup(res.text,"html.parser")
		articles = soup.find(finder,finder2)#cherche tout les url contenant les liens des articles
		
		b = soup.findAll("p")
	return b

def trieur(L):
	links = []
	for p in L:
		a = p.find('a')
		if a != None :
			link = a['href']
			links.append(link)
	return links

def recuperer_video(L):
	resultat = {}
	for i in L :
		res = requests.get(i)
		if res.ok:
			soup = BeautifulSoup(res.text,"html.parser")
			find = soup.find("iframe")
			if find != None:
				resultat[str(len(resultat))] = [soup.find("title").string.strip(" - Konoha streaming"),find["src"]]
	return resultat


r = selector("http://konohastreaming.eklablog.com/naruto-shippuden-vostfr-liste-des-episodes-a177638440","div", {"class": "article_text"})
r2 = trieur(r)
r3 = recuperer_video(r2)
print(r3)

with open('NarutoShippudenJSON.json', 'w') as outfile:
    json.dump(r3, outfile)


