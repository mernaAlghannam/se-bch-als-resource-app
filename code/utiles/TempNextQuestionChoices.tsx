import { IChoice, IQuestion } from '@/types/api_types';

const fetchAnyData = async (APIURL:string): Promise<any> => {
  const res = await fetch(APIURL, {
    method: "GET",
    });

  return await res.json();
}

export default async function tempNextChoiceSelectionFromJson(clickedChoice : IChoice): Promise<[IQuestion, IChoice[]]> {
  const choice_selected_id = clickedChoice.id
  let choices_list : IChoice[] = []
  let question : IQuestion = {id:"", title:""}
  // console.log(choice_selected_id)

  if (clickedChoice.title == "Home"){
    const question_json = await fetchAnyData("http://localhost:1338/api/first-entries/1?populate=*")

    // console.log(question_json)
    // console.log("question_json.data.attributes.choice_to_question.data"+question_json.data.attributes.question_to_choice_maps.data[0].id)

    question = {id: question_json.data.attributes.question_to_choice_maps.data[0].id, title:  question_json.data.attributes.question_to_choice_maps.data[0].attributes.QuestionName}
    // console.log(question)
  
  }else{
    const question_json = await fetchAnyData("http://localhost:1338/api/choice-to-question-maps/"+choice_selected_id+"?populate=*")

    // console.log(question_json)
    // console.log("question_json.data.attributes.choice_to_question.data"+question_json.data.attributes.choice_to_question.data)

    //if next question does not exist
    if (question_json.data.attributes.choice_to_question.data == null){
      return [question, choices_list]
    }
    question = {id: question_json.data.attributes.choice_to_question.data.id, title:  question_json.data.attributes.choice_to_question.data.attributes.QuestionName}
    // console.log(question)
  }

  const choice_json = await fetchAnyData("http://localhost:1338/api/question-to-choice-maps/"+question.id+"?populate=*")

  // console.log(choice_json)


  let temp_choicesjson = choice_json.data.attributes.question_to_choices.data
  // console.log(temp_choicesjson)
  for (let j= 0 ; j < temp_choicesjson.length; j++) {
      choices_list.push({id: temp_choicesjson[j].id, title: temp_choicesjson[j].attributes.ChoiceName})
      // console.log(temp_choicesjson[j].attributes.ChoiceName)
  }

  return [question, choices_list]

}