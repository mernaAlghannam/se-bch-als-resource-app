import React from 'react'
import {QuestionaireBodyContent} from './QuestionaireBodyContentPages'

const QuestionairePage = () => {
  return (
    <div>
      <QuestionaireBodyContent ></QuestionaireBodyContent>
      {/* FOR TESTSING PURPOSES, UNCOMMENT
       <QuestionaireBodyContent data-testid="questionaire-body-content" /> 
      */}
    </div>
  )
}
export default QuestionairePage


