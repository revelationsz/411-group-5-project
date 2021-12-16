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

export default json