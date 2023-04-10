import { Stack, Text} from '@mantine/core';
import { useEffect, useState } from "react";
import  Title from "../../components/Footer/Titles"
import { IQuestion, IChoice , IBodyContent, ISolution} from '@/types/api_types';
import search_questions_choices_from_json from './api/TempNextQuestionChoices';
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '../../components/MainBody/TogglebButton';
import SolutionPages from './SolutionPages';
import BodyButton from '../../components/MainBody/BodyButton';

export const QuestionaireBodyContent: React.FC = () => {
  const { classes } = bodyContentUseStyles();

  let [currQuestion, setCurrQuestion] = useState<IQuestion>({id: "1", title:"How can I assist you?"});
  let [currChoices, setCurChoices] = useState<IChoice[] >([{id:"5", title:"Communication"}, {id:"2", title:"Computer Access"}, {id:"3", title:"Home Access"}, {id:"4", title:"Smart Phone Access"}])
  let [clickedChoice, setClickedChoice] = useState<IChoice>({id:"1", title:"Home"})
  let [solution, setSolution] = useState<ISolution>({id:"", title:""})

  let [hasSolution, setHasSolution] = useState(false)

  let [pageTitle, setPageTitle] = useState("Home")
  let [image, setImage] = useState("/titleimghome.PNG")
  let [prevSelectedContent, setPrevSelectedContent] = useState< IBodyContent[]>([])

  // do not know where to update button content

  const updateChoicesAndQuestions = async (choice: IChoice) => {
    setClickedChoice(choice)
    let [question, choices_list, hasSol, sol] = await search_questions_choices_from_json(choice)
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
    } else {
      console.log("q is empty")
    }

    if(choice.title == "Communication"){
      setPageTitle("Communication")
      setImage("/commImg.PNG")
    }

    console.log("updateq"+prevSelectedContent.length)
    for (const element of prevSelectedContent) {
      console.log("prev content: "+element.question.title)
    }
  }

  useEffect(() => {
    console.log(clickedChoice)
    if (clickedChoice != null){
      updateChoicesAndQuestions(clickedChoice)
    }
  }, [])

  const handleClick = (choice: IChoice) => {
    console.log(clickedChoice)
    if (clickedChoice != null){
      updateChoicesAndQuestions(choice)
    }
  }


  const hasPrev = () => {
    console.log("checking"+prevSelectedContent.length)
    return prevSelectedContent.length > 1;
  };

  const prevQuestion = () => {
      if (prevSelectedContent.length > 1 && !hasSolution) {
          let i = -1

        setCurrQuestion(prevSelectedContent[prevSelectedContent.length+i].question);
        setClickedChoice(prevSelectedContent[prevSelectedContent.length+i].prevChoice);
        setCurChoices(prevSelectedContent[prevSelectedContent.length+i].choiceList)
        setPrevSelectedContent(prevSelectedContent.slice(0, i))
        if (prevSelectedContent[prevSelectedContent.length+i].prevChoice.title == "Home"){
          console.log("prev is home")
          setPageTitle("Home")
          setImage("/titleimghome.PNG")
        }
        console.log("its length"+prevSelectedContent.length)
        console.log("hassol"+hasSolution)
      } else if(hasSolution){
        setHasSolution(false)
        console.log("has solllll and i want to go back")
      }
  };

  return (
    <div>
    <Title hasPrev={hasPrev()} prevQuestion={prevQuestion} titleImg={image} title={pageTitle} />
    {!hasSolution ? 
    <BodyButton currChoices={currChoices} currQuestion={currQuestion} handleClick={handleClick}/>
    : 
    <SolutionPages solution={solution} hasSolution={hasSolution}/>
    }
    </div>
  );
};

