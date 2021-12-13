import React, {useState} from 'react'
import "survey-react/survey.css";
import * as Survey from "survey-react";
import Json from './questions'


const Mysurvey = (prop) => {
    // const [q1, Setq1] = useState()
    // const [q2, Setq2] = useState()
    // const [q3, Setq3] = useState()
    // const [q4, Setq4] = useState()
    // const [q5, Setq5] = useState()
    const [mood, Setmood] = useState({})


    return(
      <Survey.Survey
      showCompletedPage={false}
      onComplete={data=>
        Setmood(data.valuesHash)
        }
      json={Json}
    />
    )
  }

export default Mysurvey