import React, {useState, useCallback} from 'react';
import "survey-react/survey.css";
import * as Survey from "survey-react";
import Json from './questions'
import Dashboard from './Dashboard';
//import Mysurvey from './Mysurvey'
//import {Main} from '../server/server'



const  MoodSurvey = ( {code}) =>{
  const [showPage, setShowPage] = useState(true)
  const [mood, setMood] = useState()
  const [email, setEmail] = useState("")
  //const mood = ""
  

  const onCompletePage = useCallback((data)=>{
    console.log(data.valuesHash)
    setEmail(data.valuesHash.email)
    var one = ((data.valuesHash.question1))
    var two = ((data.valuesHash.question2))
    var three = ((data.valuesHash.question3))
    var four = ((data.valuesHash.question4))
    var five = ((data.valuesHash.question5))
    moodForumla(one, two, three, four ,five)
    //Main(userId, {mood})
    setShowPage(!showPage)
  },[showPage])

  


  const Mysurvey = (prop) => {
    return(
      <Survey.Survey
      showCompletedPage={false}
      onComplete={data=>
        prop.showCompletedPage((data))
        }
      json={Json}
    />
    )
  }

  const moodForumla = (q1,q2,q3,q4,q5)  => {
        var sum = q1+q2+q3+q4+q5 
        console.log(sum)
        setMood(sum)
        console.log("mood",{mood})
  }

    const onSurveyCompletion = () => {
      return(
        <main>
          <h1>mood, {mood}</h1>
          <div> test test</div>
        </main>
      )
    }

  // async function createMood(client, mood) {
  //     await client.db('moods').collection('moodsurvey').insertOne({mood})
  //     console.log("hello")
  // }
  // const { MongoClient } = require('mongodb');

  // async function main (email, moodVal) {
  //     console.log("test", email, moodVal)
  //     const uri = "mongodb+srv://sarsenw:sr24mesjw@cluster0.ilzsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  //     const client = new MongoClient(uri);        
  //     try {
  //       await client.connect() 
  //       console.log("work?")
  //          await createMood(client , {user: email, mood: moodVal})
  //          client.db('moods').collection('moodsurvey').insertOne({user: email, mood: moodVal})
  //          console.log("tt")
  //     } catch (e) {
  //       console.log(111)
  //         console.error(e)
  //     } finally {
  //          client.close()
  //     }
  // }


  
  // async function sendData () {
  //   try{
  //     if(email != ""){
  //       console.log("test")
  //       main(email,mood)
  //     }
  //   } finally {
      
  //   } 
  // }
   
  // sendData()

    return ( 
      <div className="App">
          {
            showPage?
            <Mysurvey showCompletedPage={data=>onCompletePage(data)}/>:
           // sendData()
           <Dashboard code = {code} mood={mood}/>
            // onSurveyCompletion()
            
          }
      </div>

    );
    
}


export default MoodSurvey