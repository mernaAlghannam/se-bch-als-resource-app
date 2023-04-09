import { Stack, rem , Text, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import  Title from "../Footer/Titles"
import { IQuestion, IChoice , IBodyContent, ISolution} from '@/types/api_types';
import search_questions_choices_from_json from '../../utiles/TempNextQuestionChoices';
import { bodyContentUseStyles } from './HelperFunctions/BodyContentStyle';
import Resources from './SolutionPageContent/Resources';
import getSolutionPageContentForChoice from '../../utiles/GetSolutionPageForChoice';
import { HandoutOrTestimonialLink, ResourceLink, PageContentType } from '@/types/dataTypes';
import TestimonialsOrHandouts from './SolutionPageContent/TestimonialOrHandouts';

export let prevSelectedContent : IBodyContent[] = []

export const QuestionaireBodyContent: React.FC = () => {
  const { classes } = bodyContentUseStyles();

  let [currQuestion, setCurrQuestion] = useState<IQuestion>({id: "1", title:"How can I assist you today?"});
  let [currChoices, setCurChoices] = useState<IChoice[] >([])
  let [clickedChoice, setClickedChoice] = useState<IChoice>({id:"1", title:"Home"})
  let [solution, setSolution] = useState<ISolution>({id:"", title:""})

  let [resourceList, setResourceList] = useState<ResourceLink[]>([])
  let [handoutTestimonialList, setHandoutTestimonialList] = useState<HandoutOrTestimonialLink[]>([])
  let [pageContent, setPageContent] = useState<PageContentType[]>([])


  let [isHomePage, setIsHomePage] = useState(true)
  let [hasSolution, setHasSolution] = useState(false)

  let [pageTitle, setPageTitle] = useState("Home")
  let [image, setImage] = useState("/titleimghome.PNG")

  // do not know where to update button content

  const updateChoicesAndQuestions = async () => {
    let [question, choices_list, hasSol, sol] = await search_questions_choices_from_json(clickedChoice)
    console.log(choices_list)
    setHasSolution(hasSol)
    if (hasSol){
      setSolution(sol)
    }else{
      setSolution({id:"", title:""})
    }
    console.log(hasSol)
    if (question.title != ''){
      setCurChoices(choices_list)
      setCurrQuestion(question)
      prevSelectedContent.push({questionId: question.id, questionName: question.title, choiceList: choices_list})
    }

    console.log(prevSelectedContent.length)
    for (const element of prevSelectedContent) {
      console.log("prev content: "+element.questionName)
    }

    if(clickedChoice.title == "Communication"){
      setPageTitle("Communication")
      setImage("/commImg.PNG")
      setIsHomePage(false)
    }
  }

  const getSolutionPageContent =async () => {
    let [resource_list, handouts_testimonials_list, page_content] = await getSolutionPageContentForChoice(solution.id)
    setResourceList(resource_list)
    setHandoutTestimonialList(handouts_testimonials_list)
    setPageContent(page_content)
  }

  useEffect(() => {
    console.log(clickedChoice)
    if (clickedChoice != null){
      updateChoicesAndQuestions()
    }
  }, [clickedChoice])

  useEffect(() => {
    console.log(clickedChoice)
    if (hasSolution && solution.id != ""){
      getSolutionPageContent()
    }
  }, [hasSolution])


  return (
    <div>
    <Title isHomePage={isHomePage} titleImg={image} title={pageTitle} />
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
        <Button key={choice.id}
            className={classes.inner}
            variant="outline"
            onClick = {() => setClickedChoice(choice)}
            >
              <Text fz = "xl" style={{fontSize: rem(16), whiteSpace: "normal", textAlign: 'center'}}>{choice.title}</Text>
        </Button>
      ))} 
    </Stack>
    : 
    <Stack
    spacing="xl"
    className={classes.outer}
    sx={(theme) => ({
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    })}
  >
    <Text className={classes.text}> {solution.title} </Text>
    {!pageContent.length ? <></> : <div>hi</div>}
    {!resourceList.length ? <></>:<Resources data={resourceList}></Resources> }
    {!handoutTestimonialList.length ? <></>:<TestimonialsOrHandouts data={handoutTestimonialList}></TestimonialsOrHandouts> }
  </Stack>
    }
    </div>
  );
};

