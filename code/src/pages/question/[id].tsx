import Nav from "../../../components/Navbar/Nav"
import Title from '../../../components/Footer/Titles'
import { Stack, Text} from '@mantine/core';
import { FooterLinks } from "../../../components/Footer/Footer"
import { bodyContentUseStyles } from '../../../components/MainBody/HelperFunctions/BodyContentStyle';
import { IChoice, IQuestion, ISolution } from "@/types/api_types";
import { useEffect, useState } from "react";
import { getNextQuestion, getQuestionNChoices } from "../api/getAPI";
import ToggleButton from "../../../components/MainBody/TogglebButton";
import { useRouter } from 'next/router';
import Link from "next/link";


const Questionnaire = () => {
    const { classes } = bodyContentUseStyles();
    const router = useRouter();
    
    let [question, setQuestion] = useState<IQuestion>({id: "", title:""})
    let [currChoices, setCurChoices] = useState<IChoice[] >([])
    let [nextQuestions, setNextQuestions] = useState<IQuestion[]>([])


    const getData = async(questionId: string) => {
        const {question, choices} = await getQuestionNChoices(questionId)
        setQuestion(question)
        setCurChoices(choices)
        for (var choice of choices) {
            const _question = await getNextQuestion(choice.id)
            setNextQuestions(current => [...current, _question])
        }
    }
    
    
    useEffect(() => {
        const { id } = router.query
        if (id) {
            setNextQuestions([])
            console.log(id)
            getData(id as string)
        }
    }, [router.query])



    return (
        <>
        <Nav></Nav>
        <Title hasPrev={true} router={router} titleImg={"/titleimghome.PNG"} title={"Home"} />
        <Stack
            spacing="xl"
            className={classes.outer}
            sx={(theme) => ({
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            })}
        >
            <Text className={classes.text}> {question.title} </Text>
            {question.id == "2" && nextQuestions.length == currChoices.length*2?
            currChoices.map((choice, index) => (  
                <div key={choice.id}>
                    {nextQuestions[index*2].id == ""?
                        <ToggleButton title={choice.title} />:
                        <Link href={`/question/${nextQuestions[index*2].id}`}>
                            <ToggleButton title={choice.title} />
                        </Link>
                    }
                </div>)):
            nextQuestions.length == currChoices.length?
            currChoices.map((choice, index) => (  
                <div key={choice.id}>
                    {nextQuestions[index].id == ""?
                        <ToggleButton title={choice.title} />:
                        <Link href={`/question/${nextQuestions[index].id}`}>
                            <ToggleButton title={choice.title} />
                        </Link>
                    }
                </div>)):
            <></>} 
        </Stack>
        <FooterLinks />
        
        </>
    )

}

export default Questionnaire