import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, rem, Text} from '@mantine/core';
import { IChoice } from '@/types/api_types';

interface ToggleButtonProps{
    handleClick: (choice: IChoice) => void,
    choice: IChoice;
    className: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({handleClick, choice, className}) => {

    return(
        <Button key={choice.id}
            className={className}
            variant="outline"
            onClick = {() =>handleClick(choice)}
            >
              {/* <Link href={"/"+choice}> */}
              <Text fz = "xl" style={{fontSize: rem(16), whiteSpace: "normal", textAlign: 'center'}}>{choice.title}</Text>
              {/* </Link> */}
        </Button>
    )
}

export default ToggleButton;