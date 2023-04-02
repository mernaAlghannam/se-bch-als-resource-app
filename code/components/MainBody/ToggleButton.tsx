import React, {useState} from 'react';
import {Button, Text} from '@mantine/core';
import { choices_json } from './HelperFunctions/ChoicesJson';
import { questions_json } from './HelperFunctions/QuestionsJson';

interface ToggleButtonProps{
    label: string;
    className: string;
}



const ToggleButton: React.FC<ToggleButtonProps> = ({label, className}) => {
    const [buttonColor, setButtonColor] = useState('transparent')
    const [textColor, setTextColor] = useState('#254885')
    const complete_choices = choices_json.data
    const complete_question = questions_json.data
    var curr_question = "How can we assist you?"
    var curr_choices = ["Communication", "Home Access", "Computer Access",]

    const handleButtonClick = () => {
        if (buttonColor === 'transparent'){
            setButtonColor('#254885')
            setTextColor('transparent')
        } else {
            setButtonColor('transparent')
            setTextColor('#254885')
        }



    }

    return(

        <Button
            className={className}
            variant="outline"
            onClick = {handleButtonClick}
            style = {{backgroundColor: buttonColor, color: textColor}}
            >
                <Text fz = "xl">{label}</Text>
        </Button>

        
    )
}

export default ToggleButton;