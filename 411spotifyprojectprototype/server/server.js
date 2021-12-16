require('dotenv').config()
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder')

 


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({lyrics})
})

async function createMood(client, mood) {
    const result = await client.db('moods').collection('moodsurvey').insertOne({mood})
    console.log(`test ${result.insertedID}`)
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("test")
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 
async function findMood(client, userId) {
    const result = await client.db('moods').collection('moodsurvey').findOne({user: userId})
    if(result){
        console.log(`test ${userId}`)
        console.log(result.mood)
    } else {
        console.log("no listings")
    }
}

const { MongoClient } = require('mongodb');

app.listen(3001)
async function main (){
   // export default json

    const uri = "mongodb+srv://{username}:{password}@cluster0.ilzsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);        
    try {
        console.log("work?")
        await client.connect() 
        //await listDatabases(client)
        console.log("why")
        await createMood(client , json)
        //await findMood(client, "test@b.com")
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

}
//main()



