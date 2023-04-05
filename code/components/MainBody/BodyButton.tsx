import { Stack, createStyles, rem , Text, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import search_questions_choices_from_json from './HelperFunctions/TempNextQuestionChoices'
import  Title from "../Footer/Titles"

const useStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '87%',
    // backgroundColor: 'transparent',
    color: '#254885',
    border: '2px solid #254885',
    borderRadius: rem(10),
    // width: rem(320),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',

    '&:hover': {
        backgroundColor: '#254885',  color: "#FFFFFF",
    },

    [theme.fn.smallerThan('xs')]: {
      height: '57px',
      display: 'flex',
      // textAlign: 'center',
      width: '87%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
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
    paddingTop: rem(24),
    pddingBottom: rem(24),
    paddingLeft: '10%',
  },
}));


const BodyContent: React.FC = () => {
  const { classes } = useStyles();
  // const buttonColor = 'transparent'
  // const textColor = '#254885'

  let [currQuestion, setCurrQuestion] = useState("How can I assist you today?");
  let [currChoices, setCurChoices] = useState(["Communication", "Home Access", "Computer Access", "Smart Phone Access"])
  let [clickedChoice, setClickedChoice] = useState("Home")
  let [pageTitle, setPageTitle] = useState("Home")
  let [image, setImage] = useState("/titleimghome.PNG")

  // do not know where to update button content

  const updateChoicesAndQuestions = () => {
    let [question, choices_list] = search_questions_choices_from_json(clickedChoice)
    if (question != 'undefined'){
      setCurChoices(choices_list)
      setCurrQuestion(question)
    }

    if(clickedChoice == "Communication"){
      setPageTitle("Communication")
      setImage("/commImg.PNG")
    }
  }

  useEffect(() => {
    updateChoicesAndQuestions()
  }, [clickedChoice])


  return (
    <div>
      {/* mess code do not know where to put this */}
      <Title titleImg={image} title={pageTitle} />
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
        <Button key={choice}
            className={classes.inner}
            variant="outline"
            onClick = {() => setClickedChoice(choice)}
            // style = {{backgroundColor: buttonColor, color: textColor}}
            >
              <Text fz = "xl" style={{fontSize: rem(16), whiteSpace: "normal", textAlign: 'center'}}>{choice}</Text>
        </Button>
      ))}
    </Stack>
    </div>
  );
};

export default BodyContent;
