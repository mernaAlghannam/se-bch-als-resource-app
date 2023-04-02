// BodyButton.tsx
import React from 'react';
import { Stack } from '@mantine/core';
import { useEffect, useState } from "react";
import { createStyles, rem , Title, Text, Button } from '@mantine/core';
import ToggleButton from './ToggleButton';
import { choices_json } from './HelperFunctions/ChoicesJson';
import { questions_json } from './HelperFunctions/QuestionsJson';

const useStyles = createStyles((theme) => ({
  inner: {
    height: '60px',
    display: 'flex',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rem(10),
    alignContent: 'center',
  },

  text: {
    fontWeight: 600,
    fontSize: rem(17),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    // paddingLeft: theme.spacing.xs,
    // paddingRight: theme.spacing.xs,
    color: '#254885',
    marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    lineHeight: rem(13),

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(13),
      textAlign: 'left',
    },
  },

  outer: {
    paddingTop: rem(50),
    paddingLeft: '10%',
  },
}));

interface ToggleButtonProps{
  label: string;
  className: string;
}


const BodyButton: React.FC = () => {
  const { classes } = useStyles();
  const [buttonColor, setButtonColor] = useState('transparent')
  const [textColor, setTextColor] = useState('#254885')
  const complete_choices = choices_json.data
  const complete_question = questions_json.data
  var [currQuestion, setCurrQuestion] = useState("How can I assist you today?");
  var [currChoices, setCurChoices] = useState(["Communication", "Home Access", "Computer Access", "Smart Phone Access"])
  var [clickedChoice, setClickedChoice] = useState("Home")

  const handleButtonClick = () => {
      var question;
      var next_question_exists = true
        // if (buttonColor === 'transparent'){
        //     setButtonColor('#254885')
        //     setTextColor('transparent')
        // } else {
        //     setButtonColor('transparent')
        //     setTextColor('#254885')
        // }
        // console.log( complete_choices.length)
    for (let i= 0 ; i < complete_choices.length ; i++) {
      if (complete_choices[i].attributes.Description === clickedChoice){
        let temp = complete_choices[i].attributes.Question.data?.attributes.Question
        if (String(temp) == "undefined"){
          next_question_exists = false
          break
        }
         setCurrQuestion(String(temp))
         question = String(temp)
          console.log(temp)
      }
    }

    if (next_question_exists){

    for (let i= 0 ; i < complete_question.length ; i++) {
      if (complete_question[i].attributes.Question === question){
        var temp_list : string[] = []
        let choice_list_length : number = complete_question[i].attributes.Choices.data.length
        console.log(complete_question[i].attributes.Choices.data)
        let choice_data = complete_question[i].attributes.Choices.data
        console.log(choice_list_length)
        for (let j= 0 ; j < choice_list_length; j++) {
          console.log(choice_data)
          temp_list.push(String(complete_question[i].attributes.Choices.data[j]?.attributes.Description))
          let temp = complete_question[i].attributes.Choices.data[j]?.attributes.Description
          console.log(temp)
      }
      setCurChoices(temp_list)
    }
  }
  }
  }

  useEffect(() => {
    // not fetch any grades when the current class id is empty
    // if (currClassId != "")
    //   fetchGradeData();
    handleButtonClick()
  }, [clickedChoice])


  return (
    <Stack
      h={300}
      className={classes.outer}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    >
      <Text className={classes.text}> {currQuestion} </Text>
      {currChoices.map((choice) => (    
        <Button
            className={classes.inner}
            variant="outline"
            onClick = {() => setClickedChoice(choice)}
            style = {{backgroundColor: buttonColor, color: textColor}}
            >
                <Text fz = "xl" className={classes.text}>{choice}</Text>
        </Button>
      ))}

    </Stack>
  );
};

export default BodyButton;
