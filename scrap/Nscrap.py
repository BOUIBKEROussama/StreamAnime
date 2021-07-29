import requests
from bs4 import BeautifulSoup
import json

s = requests.Session()
s.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36'
r = s.get("https://www.ianimes.org/0bdd7c4a155e5f79a8d081741b2828b4.htm")

if r.ok :
	soup = BeautifulSoup(r.text,"html.parser")
	li = soup.find_all("li", class_="cat_post_item-1 clearfix")
	
	for i in li:
		a = i.find_all("a")
		for j in a:
			if str(j).find("button") == -1 :
				res = s.get(j["href"])
				if res.ok :
					newSoup = BeautifulSoup(res.text,'html.parser')
					print(newSoup)
					video = newSoup.findAll("div", {"class": "jw-media jw-reset"})
					print(video)
