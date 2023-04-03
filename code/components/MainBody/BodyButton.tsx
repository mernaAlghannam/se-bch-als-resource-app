// BodyButton.tsx
import React from 'react';
import { Stack } from '@mantine/core';
import { useEffect, useState } from "react";
import { createStyles, rem , Text, Button, Box } from '@mantine/core';
import ToggleButton from './ToggleButton';
import search_questions_choices_from_json from './HelperFunctions/TempNextQuestionChoices'

const useStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '87%',
    border: '2px solid #254885',
    borderRadius: rem(10),
    // width: rem(320),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  text: {
    fontWeight: 600,
    paddingTop: rem(12),
    width: '80%',
    fontSize: rem(20),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    color: '#254885',
    // marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    // lineHeight: rem(16),

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(20),
      textAlign: 'left',
      width: '80%'
    },
  },

  outer: {
    paddingTop: rem(20),
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

  var [currQuestion, setCurrQuestion] = useState("How can I assist you today?");
  var [currChoices, setCurChoices] = useState(["Communication", "Home Access", "Computer Access", "Smart Phone Access"])
  var [clickedChoice, setClickedChoice] = useState("Home")

  const handleButtonClick = () => {
    let [question, choices_list] = search_questions_choices_from_json(clickedChoice)
    if (question != 'undefined'){
      setCurChoices(choices_list)
      setCurrQuestion(question)
    }
  }

  useEffect(() => {
    handleButtonClick()
  }, [clickedChoice])


  return (
    <Stack
      spacing="xl"
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
              <Text style={{display: 'block', fontSize: rem(16)}}>{choice}</Text>
        </Button>
      ))}

    </Stack>
  );
};

export default BodyButton;
