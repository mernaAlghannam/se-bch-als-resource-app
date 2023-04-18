import { Stack, Text} from '@mantine/core';
import { useEffect, useState } from "react";
import  Title from "../../components/Footer/Titles"
import { IQuestion, IChoice , IBodyContent, ISolution} from '@/types/api_types';
import {searchNextChoiceSelectionFromJson} from './api/TempNextQuestionChoices';
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '../../components/MainBody/TogglebButton';
import SolutionPages from './SolutionPages';

export const QuestionaireBodyContent: React.FC = () => {
  const { classes } = bodyContentUseStyles();

  let [currQuestion, setCurrQuestion] = useState<IQuestion>({id: "", title:""});
  let [currChoices, setCurChoices] = useState<IChoice[] >([])
  let [clickedChoice, setClickedChoice] = useState<IChoice>({id:"1", title:"Home"})
  let [solution, setSolution] = useState<ISolution>({id:"", title:""})

  let [hasSolution, setHasSolution] = useState(false)

  let [pageTitle, setPageTitle] = useState("Home")
  let [image, setImage] = useState("/titleimghome.PNG")
  let [prevSelectedContent, setPrevSelectedContent] = useState< IBodyContent[]>([])

  // do not know where to update button content

  const updateChoicesAndQuestions = async () => {
    let [question, choices_list, hasSol, sol] = await searchNextChoiceSelectionFromJson(clickedChoice)
    console.log(choices_list)
    setHasSolution(hasSol)
    if (hasSol){
      setSolution(sol)
    }else{
      setSolution({id:"", title:""})
    }
    console.log(hasSol)
    if (question.title != ''){
      setPrevSelectedContent(prevSelectedContent.concat({question: currQuestion, prevChoice: clickedChoice, choiceList:  currChoices}))
      setCurChoices(choices_list)
      setCurrQuestion(question)
    }

    if(clickedChoice.title == "Communication"){
      setPageTitle("Communication")
      setImage("/commImg.PNG")
    } else if (prevSelectedContent.length < 2){
      setPageTitle("Home")
      setImage("/titleimghome.PNG")
    }

    console.log("updateq"+prevSelectedContent.length)
    for (const element of prevSelectedContent) {
      console.log("prev content: "+element.question.title)
    }
  }

  useEffect(() => {
    console.log(clickedChoice)
    if (clickedChoice != null){
      updateChoicesAndQuestions()
    }
  }, [clickedChoice])


  const hasPrev = () => {
    console.log("checking"+prevSelectedContent.length)
    return prevSelectedContent.length > 1;
  };

  const prevQuestion = () => {
      if (prevSelectedContent.length > 1) {
          let i = 2
        if (hasSolution){
          i=1
        }
        setCurrQuestion(prevSelectedContent[prevSelectedContent.length-i].question);
        setClickedChoice(prevSelectedContent[prevSelectedContent.length-i].prevChoice);
        setCurChoices(prevSelectedContent[prevSelectedContent.length-i].choiceList)
        setPrevSelectedContent(prevSelectedContent.slice(0, -i))
        console.log("its length"+prevSelectedContent.length)
        console.log("hassol"+hasSolution)
      }
  };

  return (
    <div>
    <Title hasPrev={hasPrev()} prevQuestion={prevQuestion} titleImg={image} title={pageTitle} />
    {!hasSolution ? 
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
        <div key={choice.id}>
        <ToggleButton setClickedChoice={setClickedChoice} className={classes.inner} choice={choice} />
        </div>
      ))} 
    </Stack>
    : 
    <SolutionPages solution={solution} hasSolution={hasSolution}/>
    }
    </div>
  );
};

