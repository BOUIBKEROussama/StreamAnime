import requests
from bs4 import BeautifulSoup

"""res = requests.get("https://one-piece-streaming-vostfr.com")
print(res)

if res.ok :
	links = []
	soup = BeautifulSoup(res.text,"html.parser")
	articles = soup.findAll('article')
	#print(len(articles))
	#print(articles)
	for i in articles :
		a = i.find('a')
		link = a['href']
		links.append(link)
	#print(links)
	L = []
	for i in links :
		res2 = requests.get(i)
		s = BeautifulSoup(res2.text,"html.parser")
		articles = soup.findAll('article')
		print(iframe)
		#iframe = i.find('iframe')
		#print(iframe)
		#link_video = iframe['src']
		#L.append(link_video)
	print(L)
"""

def connection(url,finder):#connection au site internet
	res = requests.get(url)
	if res.ok :
		soup = BeautifulSoup(res.text,"html.parser")
		articles = soup.findAll(finder)#cherche tout les url contenant les liens des articles
	return articles


def trieur(L,finder,finder2):#permet le paufinage de la liste d'articles et retourne les liens des articles
	links = []
	for i in L:
		a = i.find(finder)
		link = a[finder2]
		links.append(link)
	return links

def video_(liste_url,finder,finder2):#ouvre les urls et recupere les videos (avec leur balise)
	L = {}
	for url in liste_url:
		res = requests.get(url)
		if res.ok :
			soup =BeautifulSoup(res.text,"html.parser")
			L[soup.title.string] = soup.find(finder,finder2)
	return L

def findInList(L,taille):#permet le paufinage de la liste de videos
	d = dict()
	i = taille
	for cle,valeur in L.items() :
		b = valeur.find("iframe")["src"]
		if b.find("//iframe")!= -1:
			print("je fais rien iframe")
		elif b.find("youtube") != -1:
			print("je fais rien youtube")
		else:
			d[str(i)] = [cle,b]
			i = i+1
	return d

liste = []
dico = {}


for i in range(94, 0, -1):
	url = "https://one-piece-streaming-vostfr.com/page/"+str(i)
	p = connection(url,"article")
	print(p)
	p2 = trieur(p,"a","href")
	p3 =video_(p2,"div",{"class": "video-container"})
	dico.update(findInList(p3,len(dico)))
	print(dico)
	print()
	print()
	print()
	print()
