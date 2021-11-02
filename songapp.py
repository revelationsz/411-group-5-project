# -*- coding: utf-8 -*-
"""
Created on Mon Nov  1 19:55:36 2021

@author: admin
"""

import flask
from flask import Flask, Response, request, render_template, redirect, url_for
from flaskext.mysql import MySQL
import flask_login
from datetime import datetime



mysql = MySQL()
app = Flask(__name__)
app.secret_key = 'super secret string'  # Change this!

#These will need to be changed according to your creditionals
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'chaochao123' 
app.config['MYSQL_DATABASE_DB'] = 'songapp'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)

#begin code used for login
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()
cursor.execute("SELECT email from Users")
users = cursor.fetchall()
print(users[0][0])

def getUserList():
    cursor = conn.cursor()
    cursor.execute("SELECT email from Users")
    return cursor.fetchall()


def getUserIdFromEmail(email):
    cursor = conn.cursor()
    cursor.execute("SELECT uid  FROM Users WHERE email = '{0}'".format(email))
    return cursor.fetchone()[0]


uid=getUserIdFromEmail(users[0][0])
print(uid)

def getUsersName(uid):
    cursor = conn.cursor()
    cursor.execute("SELECT user_name FROM Users WHERE uid = '{0}'".format(uid))
    return cursor.fetchone()[0]

name=getUsersName(uid)
print(name)

class User(flask_login.UserMixin):
    pass

@login_manager.user_loader
def user_loader(email):
    users = getUserList()
    if not(email) or email not in str(users):
        return
    user = User()
    user.id = email
    return user

@login_manager.request_loader
def request_loader(request):
    users = getUserList()
    email = request.form.get('email')
    if not(email) or email not in str(users):
        return
    user = User()
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT password FROM Users WHERE email = '{0}'".format(email))
    data = cursor.fetchall()
    pwd = str(data[0][0] )
    if request.form['password'] == pwd:
        user.id = email
        return user
    return None

