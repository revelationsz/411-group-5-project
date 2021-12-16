


export default function stuff(userId, moodVal){
    userId = userId
    moodVal = moodVal
    
const { MongoClient } = require('mongodb');

async function createMood(client, mood) {
    const result = await client.db('moods').collection('moodsurvey').insertOne({mood})
    console.log(`test ${result.insertedID}`)
}


 
async function findMood(client, userId) {
    const result = await client.db('moods').collection('moodsurvey').findOne({user: userId})
    if(result){
        console.log(`test ${userId}`)
        console.log(result.mood)
    } else {
        console.log("no listings")
    }
}

async function main (userId, moodVal){
    const uri = "mongodb+srv://sarsenw:sr24mesjw@cluster0.ilzsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = await new MongoClient(uri , { useNewUrlParser: true, useUnifiedTopology: true});        
    try {
        console.log("work?")
        await client.connect() 
        //await listDatabases(client)
        await createMood(client , {user: userId, mood: moodVal})
        //await findMood(client, "test@b.com")
        console.log("why")
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

}

main()

}