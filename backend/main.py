import os
from os.path import join, dirname
from pathlib import Path

import json
from dotenv import load_dotenv, load_ipython_extension
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

env_path = Path(__file__).parents[1] / '.env.dev'
load_dotenv(env_path)

POSTGRES_HOST = os.environ.get('POSTGRES_HOST')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASS = os.environ.get('POSTGRES_PASSWORD')
POSTGRES_DB = os.environ.get('POSTGRES_DB')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT')

example_cars = []
with open('./../web-scraper/output_example.json', 'r') as f:
    example_cars = json.load(f)

app = Flask(__name__)
POSTGRES_URI = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASS}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}'
print(POSTGRES_URI)

app.config['SQLALCHEMY_DATABASE_URI'] = POSTGRES_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    manufacturer = db.Column(db.String(100))
    model = db.Column(db.String(100))
    year = db.Column(db.Integer)
    price = db.Column(db.Integer)
    url = db.Column(db.String(200))
    image_url = db.Column(db.String(800))

    def __init__(self, manufacturer, model, year, price, url, image_url):
        self.manufacturer = manufacturer
        self.model = model
        self.year = year
        self.price = price
        self.url = url
        self.image_url = image_url

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

def find_one_response(input_content):
    return app.response_class(
        response = json.dumps(input_content),
        status = 200,
        mimetype = 'application/json'
    )

@app.route("/cars", methods=["POST"])
def bulk_create_cars():
    if request.method == 'POST':
        cars = request.get_json()
        formatted_cars = []
        for car in cars:
            new_car = Car(**car)
            db.session.add(new_car)
            formatted_cars.append(new_car)

        db.session.commit()
        return find_one_response({})

@app.route("/register")
def register():
    return

@app.route("/login")
def login():
    return

@app.route("/cars")
def get_cars():
    # TODO: make this fetch from Postgres
    Car.query.all()
    return find_one_response(example_cars)

if __name__ == '__main__':
    app.run()