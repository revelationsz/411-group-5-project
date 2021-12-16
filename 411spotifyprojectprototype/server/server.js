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
    const json = {
        title: "Mood Survey",
        description: "Can we guess your current mood?",
        pages: [
          {
            name: "page1",
            elements: [
              {
                type: "text",
                name: "email",
                title: "Enter your email:",
                isRequired: true,
                inputType: "email"
              },
              {
                type: "rating",
                name: "question1",
                title: "Are you feeling energetic today?",
                isRequired: true,
                // rateValues: [
                //   {
                //     value: 5,
                //     text: "1"
                //   },
                //   {
                //     value: 4,
                //     text: "2"
                //   },
                //   {
                //     value: 3,
                //     text: "3"
                //   },
                //   {
                //     value: 2,
                //     text: "4"
                //   },
                //   {
                //     value: 1,
                //     text: "5"
                //   }
                // ],
                minRateDescription: "(Most unlikely)",
                maxRateDescription: "(Most likely)"
              },
              {
                type: "rating",
                name: "question2",
                title: "Did you get a good sleep last night? (Did you sleep longer than 6 hours?)",
                isRequired: true,
                // rateValues: [
                //   {
                //     value: 5,
                //     text: "1"
                //   },
                //   {
                //     value: 4,
                //     text: "2"
                //   },
                //   {
                //     value: 3,
                //     text: "3"
                //   },
                //   {
                //     value: 2,
                //     text: "4"
                //   },
                //   {
                //     value: 1,
                //     text: "5"
                //   }
                // ],
                minRateDescription: "(Most unlikely) ",
                maxRateDescription: "(Most likely)"
              },
              {
                type: "rating",
                name: "question3",
                title: "Do you feel anxious or stressed out?",
                isRequired: true,
                rateValues: [
                  {
                    value: 5,
                    text: "1"
                  },
                  {
                    value: 4,
                    text: "2"
                  },
                  {
                    value: 3,
                    text: "3"
                  },
                  {
                    value: 2,
                    text: "4"
                  },
                  {
                    value: 1,
                    text: "5"
                  }
                ],
                minRateDescription: "(Most unlikely) ",
                maxRateDescription: "(Most likely)"
              },
              {
                type: "rating",
                name: "question4",
                title: "Are you looking forward to your day?",
                isRequired: true,
                // rateValues: [
                //   {
                //     value: 5,
                //     text: "1"
                //   },
                //   {
                //     value: 4,
                //     text: "2"
                //   },
                //   {
                //     value: 3,
                //     text: "3"
                //   },
                //   {
                //     value: 2,
                //     text: "4"
                //   },
                //   {
                //     value: 1,
                //     text: "5"
                //   }
                // ],
                minRateDescription: "(Most unlikely) ",
                maxRateDescription: "(Most likely)"
              },
              {
                type: "rating",
                name: "question5",
                title: "Do you think of death or suicide?",
                isRequired: true,
                rateValues: [
                  {
                    value: 5,
                    text: "1"
                  },
                  {
                    value: 4,
                    text: "2"
                  },
                  {
                    value: 3,
                    text: "3"
                  },
                  {
                    value: 2,
                    text: "4"
                  },
                  {
                    value: 1,
                    text: "5"
                  }
                ],
                minRateDescription: "(Most unlikely) ",
                maxRateDescription: "(Most likely)"
              }
            ]
          },
          {
            name: "page2",
            elements: [
              {
                type: "expression",
                name: "mood1",
                visibleIf: "{question1} + {question2} + {question4} + {question3} +  {question5} > 15",
                title: "Your mood is:",
                description: "Happy",
                valueName: "Happy"
              },
              {
                type: "expression",
                name: "mood2",
                visibleIf: "{question1} + {question2} + {question4} + {question3} +  {question5} < 15",
                title: "Your mood is:",
                description: "Sad",
                valueName: "Sad"
              },
              {
                type: "expression",
                name: "mood3",
                visibleIf: "{question1} + {question2} + {question4} + {question3} +  {question5} == 15",
                title: "Your mood is:",
                description: "Chill",
                valueName: "Chill"
              }
            ],
            title: "Mood"
          }
        ],
        showQuestionNumbers: "off"
      };
    
   // export default json

    const uri = "mongodb+srv://sarsenw:sr24mesjw@cluster0.ilzsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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



