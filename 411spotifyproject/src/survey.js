import React, { Component } from 'react';
import './App.css';
import "survey-react/survey.css";
import * as Survey from "survey-react";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.onCompleteComponent = this.onCompleteComponent.bind(this)
  }
  onCompleteComponent = () => {
    this.setState({
      isCompleted: true
    })
  }
  render() {
    //NPS Survey starts here

    var json = {
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
              minRateDescription: "(Most unlikely)",
              maxRateDescription: "(Most likely)"
            },
            {
              type: "rating",
              name: "question2",
              title: "Did you get a good sleep last night? (Did you sleep longer than 6 hours?)",
              isRequired: true,
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
                  value: "5",
                  text: "1"
                },
                {
                  value: "4",
                  text: "2"
                },
                {
                  value: 3,
                  text: "3"
                },
                {
                  value: "2",
                  text: "4"
                },
                {
                  value: "1",
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
                  value: "5",
                  text: "1"
                },
                {
                  value: "4",
                  text: "2"
                },
                {
                  value: 3,
                  text: "3"
                },
                {
                  value: "2",
                  text: "4"
                },
                {
                  value: "1",
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

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
      />

    ) : null

    var onSurveyCompletion = this.state.isCompleted ? (
      <div>Thanks for completing the mood survey :)</div>
    ) : null


    return (
      <div className="App">
        <div>
          {surveyRender}
          {onSurveyCompletion}
        </div>
      </div>
    );
  }
}


export default App;
