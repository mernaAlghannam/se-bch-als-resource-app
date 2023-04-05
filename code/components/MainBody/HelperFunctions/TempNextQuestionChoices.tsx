import { choices_json } from './ChoicesJson';
import { questions_json } from './QuestionsJson';

export default function tempNextChoiceSelectionFromJson(clickedChoice : string): [string, string[]] {
  const complete_choices = choices_json.data
  const complete_question = questions_json.data
  const choice_selected = clickedChoice
  let choices_list : string[] = []
  let next_question_exists = true
  let question = ""

  for (let i= 0 ; i < complete_choices.length ; i++) {
    if (complete_choices[i].attributes.Description === choice_selected){
      question = String(complete_choices[i].attributes.Question.data?.attributes.Question)
      if (question == "undefined"){
        next_question_exists = false
        break
      }
    }
  }

  if (next_question_exists){
    for (let i= 0 ; i < complete_question.length ; i++) {
      if (complete_question[i].attributes.Question === question){
        let choice_list_length : number = complete_question[i].attributes.Choices.data.length
        console.log(complete_question[i].attributes.Choices.data)
        let choice_data = complete_question[i].attributes.Choices.data
        console.log(choice_list_length)
        for (let j= 0 ; j < choice_list_length; j++) {
          console.log(choice_data)
          choices_list.push(String(complete_question[i].attributes.Choices.data[j]?.attributes.Description))
          let temp = complete_question[i].attributes.Choices.data[j]?.attributes.Description
          console.log(temp)
        }
      }
    }
  }

  return [question, choices_list]

}