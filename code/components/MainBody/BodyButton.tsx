// BodyButton.tsx
import React from 'react';
import { Stack, Text } from '@mantine/core';
import { bodyContentUseStyles } from './HelperFunctions/BodyContentStyle';
import ToggleButton from './TogglebButton';
import { IChoice, IQuestion } from '@/types/api_types';

interface BodyButtonsProps{
  currChoices: IChoice[],
  currQuestion: IQuestion,
  handleClick: (choice: IChoice) => void,
}

const BodyButton: React.FC<BodyButtonsProps> = ({currChoices, currQuestion, handleClick}) => {
  const { classes } = bodyContentUseStyles();

  return (
    <Stack
      spacing="xl"
      className={classes.outer}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    >
      <Text className={classes.text}> {currQuestion.title} </Text>
      {currChoices.map((choice: IChoice) => (  
        <div key={choice.id}>
        <ToggleButton handleClick={handleClick} className={classes.inner} choice={choice} />
        </div>
      ))} 
    </Stack>
  );
};

export default BodyButton;