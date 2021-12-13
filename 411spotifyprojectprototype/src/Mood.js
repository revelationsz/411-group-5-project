import React, {useState, useCallback} from 'react';
import "survey-react/survey.css";
import * as Survey from "survey-react";
import Json from './questions'
import Dashboard from './Dashboard';
//import Mysurvey from './Mysurvey'


const  MoodSurvey = ( {code}) =>{
  const [showPage, setShowPage] = useState(true)
  const [mood, setMood] = useState()
  //const mood = ""
  

  const onCompletePage = useCallback((data)=>{
   // setMood(data.valuesHash)
    var one = ((data.valuesHash.question1))
    var two = ((data.valuesHash.question2))
    var three = ((data.valuesHash.question3))
    var four = ((data.valuesHash.question4))
    var five = ((data.valuesHash.question5))
    moodForumla(one, two, three, four ,five)
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
    
    
    return ( 
      <div className="App">
          {
            showPage?
            <Mysurvey showCompletedPage={data=>onCompletePage(data)}/>:
            <Dashboard code = {code} mood = {mood}/>
            // onSurveyCompletion()
            
          }
      </div>

    );
    
}


export default MoodSurvey