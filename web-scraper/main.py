from bs4 import BeautifulSoup
import requests
import json

# TODO:
# https://geonode.com/free-proxy-list

page = requests.get("https://www.autovit.ro/autoturisme")
soup = BeautifulSoup(page.content, 'html.parser')

car_articles = soup.select('article')[1:-5]
scraped_cars = []

# Set all_article_tags to all article tags of the soup
for article in car_articles:
    new_car = {}
    details_div = article.select_one('div:first-child')

    year_str = details_div.select_one('div:first-child ul li:first-child').text.strip()

    full_model_name =  details_div.select_one('h2:first-child').text
    offer_url = details_div.select_one('h2:first-child a:first-child').attrs['href']

    [manufacturer, *model_arr] = full_model_name.strip().split(' ')
    model = ' '.join(model_arr)

    image_url = article.find(
        lambda tag: tag.name == "img"
    ).attrs["src"]

    price_arr = article.find(lambda tag:
        tag.name == "span" 
        and tag.parent.name == "div"
        and "EUR" in tag.text
    ).text.strip().split(' ')

    currency = price_arr.pop()

    if len(price_arr) > 1:
        price_str = ''.join(price_arr)
    if len(price_arr) == 0:
        price_str = price_arr[0]

    price_str += ' ' + currency

    scraped_cars.append({
        "url": offer_url,
        "manufacturer": manufacturer,
        "model": model,
        "year": year_str,
        "price": price_str,
        "image_url": image_url
    })

print(scraped_cars)

with open('./output_example.json', 'w') as json_file:
    json.dump(scraped_cars, json_file)
