from bs4 import BeautifulSoup
import requests
import json

# TODO:
# https://geonode.com/free-proxy-list

pageNumber = 1
scraped_cars = []

while pageNumber != 15:
    url = f"https://www.autovit.ro/autoturisme?page={pageNumber}"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    car_articles = soup.select('article')[1:-5]

    # Set all_article_tags to all article tags of the soup
    for article in car_articles:
        new_car = {}
        details_div = article.select_one('div:first-child')

        year = int(details_div.select_one('div:first-child ul li:first-child').text.strip())
        mileage = (details_div.select_one('div:first-child ul li:nth-child(2)').text.strip()).replace(" ", "")[: -2]
        cylinderCapacity = (details_div.select_one('div:first-child ul li:nth-child(3)').text.strip()).replace(" ", "")

        if "Electric" in cylinderCapacity:
            cylinderCapacity = 0
            fuelType = "Electric"
        else:
            cylinderCapacity = cylinderCapacity[: -3]
            fuelType = (details_div.select_one('div:first-child ul li:nth-child(4)').text.strip())

        location = (details_div.select_one('p:last-child').text.strip()).split(' ')[0]

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

        price_arr.pop()
        price = int(''.join(price_arr))

        scraped_cars.append({
            "url": offer_url,
            "manufacturer": manufacturer,
            "model": model,
            "year": year,
            "price": price,
            "image_url": image_url,
            "mileage": int(mileage),
            "cylinderCapacity": int(cylinderCapacity),
            "fuelType": fuelType,
            "location": location
        })

    print(pageNumber)
    pageNumber = pageNumber + 1

print(scraped_cars)

if len(scraped_cars) > 0:
    with open('./output_example.json', 'w') as json_file:
        json.dump(scraped_cars, json_file)

    for car in scraped_cars:
        response = requests.post('http://localhost:1337/cars', data=car)
        print(response.status_code)