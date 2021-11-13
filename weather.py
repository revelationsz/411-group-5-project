import requests
from flask import Flask, render_template, request
from tkinter import *
import math

city_name = "Boston,US"

api_key = "950143afcefc9332553b25a26396132e"


def get_weather(api_key, city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    response = requests.get(url).json()

    temp = response['main']['temp']

    # converts Kelvin to Fahrenheit and rounds up
    temp = math.floor((temp * 1.8) - 459.67)

    humidity = response['main']['humidity']

    # response['weather'][0] = {'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}
    description = response['weather'][0]['main']
    description_specific = response['weather'][0]['description']

    return {
        'temp': temp,
        'humidity': humidity,
        'description': description,
        'description_specific': description_specific
    }


weather = get_weather(api_key, city_name)

print(weather)
print(weather['temp'])
print(weather['humidity'])
print(weather['description'])
print(weather['description_specific'])
