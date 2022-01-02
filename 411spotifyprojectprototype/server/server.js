require('dotenv').config()
//import {useState} from 'react'
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes')

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const info = {}
const PORT = 3001;
//const routes = require('./sendinfo')
const router = express.Router()
const morgan = require('morgan')
const mongoose = require('mongoose')


app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
    })
    spotifyApi.refreshAccessToken().then
        (data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        }).catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

const mogoDB = 'mongodb+srv://sarsenw:sr24mesjw@cluster0.ilzsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mogoDB, {
        useNewUrlParser: true, useUnifiedTopology: true
    })

mongoose.connection.on('connected', () => {
    console.log("connecting is a success")
})

const Schema = mongoose.Schema
const userInfoSchema = new Schema({ 
    email: String,
    mood: Number
})

const userInfo = mongoose.model('UserInfo', userInfoSchema)

app.post('/sendinfo', (req,res) => {
    console.log(req.body)
    const newuserInfo = new userInfo(req.body) //instance of model
    newuserInfo.save((error) => {
        if(error) {
            console.log(error)
        } else {
            console.log('data saved')
        }
    })
    })
    
app.use(morgan('tiny'))

app.get('/getinfo',(req,res) => { 
    userInfo.find({ })
    .then((data) => {
        console.log(data) 
        res.json(data)
    })
    .catch((error) => {
        console.log(error)
    })
   
})

app.listen(3001)





