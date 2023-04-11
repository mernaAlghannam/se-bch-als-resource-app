import React, {useState} from 'react';
import {Button, Text} from '@mantine/core';

interface ToggleButtonProps{
    label: string;
    className: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({label, className}) => {
    const [buttonColor, setButtonColor] = useState('transparent')
    const [textColor, setTextColor] = useState('#254885')

    const handleButtonClick = () => {
        if (buttonColor === 'transparent'){
            setButtonColor('#254885')
            setTextColor('white')
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
                <Text fz = "xl" style={{color: textColor}}>{label}</Text>
        </Button>
    )
}

export default ToggleButton;