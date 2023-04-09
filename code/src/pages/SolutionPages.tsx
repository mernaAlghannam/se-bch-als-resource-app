import React from 'react'
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import { Stack, Text} from '@mantine/core';
import TestimonialsOrHandouts from '../../components/MainBody/SolutionPageContent/TestimonialOrHandouts';
import Resources from '../../components/MainBody/SolutionPageContent/Resources';
import { ISolution } from '@/types/api_types';
import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from '@/types/dataTypes';

interface SolutionContentProps{
  solution: ISolution,
  handoutTestimonialList: HandoutOrTestimonialLink[],
  resourceList: ResourceLink[],
  pageContent: PageContentType[]
}

const SolutionPages: React.FC<SolutionContentProps> = ({solution, handoutTestimonialList, resourceList, pageContent}) => {
  const { classes } = bodyContentUseStyles();

  return (
    <div>
          <Stack
          spacing="xl"
          className={classes.outer}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          })}
        >
          <Text className={classes.text}> {solution.title} </Text>
          {!pageContent.length ? <></> : <div> This is place holder content</div>}
          {!resourceList.length ? <></>:<Resources data={resourceList}></Resources> }
          {!handoutTestimonialList.length ? <></>:<TestimonialsOrHandouts data={handoutTestimonialList}></TestimonialsOrHandouts> }
        </Stack>
    </div>
  )
}
export default SolutionPages