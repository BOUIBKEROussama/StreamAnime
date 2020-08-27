import requests
from bs4 import BeautifulSoup
import json


def selector(url,finder,finder2):#connection au site internet
	res = requests.get(url)
	if res.ok :
		soup = BeautifulSoup(res.text,"html.parser")
		div = soup.findAll(id="liste_episodes")
		a = div.findAll("a")
	return a

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


#r = selector("https://www.manga-sanctuary.com/fiche_serie_episodes.php?id=7329","span", {"id": "img_6649"})
#print(r)
#r2 = trieur(r)
#print(r2)
"""r3 = recuperer_video(r2)
print(r3)

with open('NarutoShippudenJSON.json', 'w') as outfile:
    json.dump(r3, outfile)

"""

res = requests.get("https://www.manga-sanctuary.com/fiche_serie_episodes.php?id=7329")
if res.ok :
	soup = BeautifulSoup(res.text,"html.parser")
	tds = soup.findAll("h2")
	print(tds)
	links = []
	for p in tds : 
		a = p.find('a')
		if a != None :
			print(a)
			link = a['href']
			links.append(link)
	resultat = {}
	for i in links :
		url2 = "https://www.manga-sanctuary.com/"+i
		res2 = requests.get(url2)
		
		if res2.ok :
			print(res2)
			soup2 = BeautifulSoup(res2.text,"html.parser")
			print(soup2.title)
			#find = soup2.find("iframe", {"id": "content_video_youtube_api"})
			find = soup2.find(id="infos_episode")
			print(find)
			print("oui")