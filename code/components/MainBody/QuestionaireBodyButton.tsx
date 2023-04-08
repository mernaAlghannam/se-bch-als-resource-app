import { Stack, createStyles, rem , Text, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import  Title from "../Footer/Titles"
import { IQuestion, IChoice , IBodyContent} from '@/types/api_types';
import search_questions_choices_from_json from '../../utiles/TempNextQuestionChoices';
import { bodyContentUseStyles } from './HelperFunctions/BodyContentStyle';

export var prevSelectedContent : IBodyContent[] = []

export const QuestionaireBodyContent: React.FC = () => {
  const { classes } = bodyContentUseStyles();

  let [currQuestion, setCurrQuestion] = useState<IQuestion>({id: "1", title:"How can I assist you today?"});
  let [currChoices, setCurChoices] = useState<IChoice[] >([])
  let [clickedChoice, setClickedChoice] = useState<IChoice>({id:"1", title:"Home"})
  let [isHomePage, setIsHomePage] = useState(true)

  let [pageTitle, setPageTitle] = useState("Home")
  let [image, setImage] = useState("/titleimghome.PNG")

  // do not know where to update button content

  const updateChoicesAndQuestions = async () => {
    let [question, choices_list] = await search_questions_choices_from_json(clickedChoice)
    console.log(choices_list)
    if (question.title != ''){
      setCurChoices(choices_list)
      setCurrQuestion(question)
      prevSelectedContent.push({questionId: question.id, questionName: question.title, choiceList: choices_list})
    }

    console.log(prevSelectedContent.length)
    for (let j= 0 ; j < prevSelectedContent.length; j++) {
      console.log("prev content: "+prevSelectedContent[j].questionName)
    }

    if(clickedChoice.title == "Communication"){
      setPageTitle("Communication")
      setImage("/commImg.PNG")
    }
  }

  useEffect(() => {
    console.log(clickedChoice)
    if (clickedChoice != null){
      updateChoicesAndQuestions()
    }
  }, [clickedChoice])


  return (
    <div>
      <Title isHomePage={isHomePage} titleImg={image} title={pageTitle} />
    <Stack
      spacing="xl"
      className={classes.outer}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    >
      <Text className={classes.text}> {currQuestion.title} </Text>
      {currChoices.map((choice) => (  
        <Button key={choice.id}
            className={classes.inner}
            variant="outline"
            onClick = {() => setClickedChoice(choice)}
            >
              <Text fz = "xl" style={{fontSize: rem(16), whiteSpace: "normal", textAlign: 'center'}}>{choice.title}</Text>
        </Button>
      ))}
    </Stack>
    </div>
  );
};

