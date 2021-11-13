import requests
from flask import Flask, render_template, request
from tkinter import *
import math

city_name = "Boston,US"

api_key = "950143afcefc9332553b25a26396132e"

def get_weather(api_key, city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

    response = requests.get(url).json()

    temp = response['main']['temp']  # calvin
    # Convert to ferenheit and rounds up
    temp = math.floor((temp * 1.8) - 459.67)

    feels_like = response['main']['feels_like']  # calvin
    # Convert to ferenheit and rounds up
    feels_like = math.floor((feels_like * 1.8) - 459.67)

    humidity = response['main']['humidity']
    return {
        'temp': temp,
        'feels_like': feels_like,
        'humidity': humidity
    }


weather = get_weather(api_key, city_name)

print(weather['temp'])
print(weather['feels_like'])
print(weather['humidity'])

