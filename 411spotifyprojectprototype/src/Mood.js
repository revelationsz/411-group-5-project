import React, {useState, useCallback, useEffect} from 'react';
import "survey-react/survey.css";
import * as Survey from "survey-react";
import Json from './questions'
import Dashboard from './Dashboard';
import axios from 'axios'




const  MoodSurvey = ( {code}) =>{
  const [showPage, setShowPage] = useState(true)
  const [mood, setMood] = useState()
  const [email, setEmail] = useState("")
  

  const onCompletePage = useCallback((data)=>{
    console.log(data.valuesHash)
    setEmail(data.valuesHash.email)
    var one = ((data.valuesHash.question1))
    var two = ((data.valuesHash.question2))
    var three = ((data.valuesHash.question3))
    var four = ((data.valuesHash.question4))
    var five = ((data.valuesHash.question5))
    moodForumla(one, two, three, four ,five)
    setShowPage(!showPage)
  },[showPage])

  
  useEffect(() =>{
    const info = {
      email: email,
      mood: mood
    }
    if(mood != null){
      axios.post('http://localhost:3001/sendinfo',info)
      .then(response =>{
      console.log(response.body);
      }).catch(err =>
        console.log(err)
        ) 
    }
    
  },[mood])


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
        setMood(sum)
  }



    return ( 
      <div className="App">
          {
            showPage?
            <Mysurvey showCompletedPage={data=>onCompletePage(data)}/>:
           <Dashboard code = {code} email={email}/>
            
          }
      </div>

    );
    
}


export default MoodSurvey