import React, { useEffect, useState } from 'react'
import { bodyContentUseStyles } from '../../components/MainBody/HelperFunctions/BodyContentStyle';
import { Stack, Text} from '@mantine/core';
import TestimonialsOrHandouts from '../../components/MainBody/SolutionPageContent/TestimonialOrHandouts';
import Resources from '../../components/MainBody/SolutionPageContent/Resources';
import { ISolution } from '@/types/api_types';
import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from '@/types/dataTypes';
import getSolutionPageContentForChoice from './api/GetSolutionPageForChoice';
import PageContent from '../../components/MainBody/SolutionPageContent/PageContent';

interface SolutionContentProps{
  solution: ISolution,
  hasSolution: boolean
}

const SolutionPages: React.FC<SolutionContentProps> = ({solution, hasSolution}) => {
  const { classes } = bodyContentUseStyles();
  let [resourceList, setResourceList] = useState<ResourceLink[]>([])
  let [handoutTestimonialList, setHandoutTestimonialList] = useState<HandoutOrTestimonialLink[]>([])
  let [pageContent, setPageContent] = useState<PageContentType[]>([])

  const getSolutionPageContent =async () => {
    let [resource_list, handouts_testimonials_list, page_content] = await getSolutionPageContentForChoice(solution.id)
    setResourceList(resource_list)
    setHandoutTestimonialList(handouts_testimonials_list)
    setPageContent(page_content)
  }
  
  useEffect(() => {
    if (hasSolution && solution.id != ""){
      getSolutionPageContent()
    }
  }, [hasSolution])

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
          {!pageContent.length ? <></> : <div> <PageContent data={pageContent}></PageContent></div>}
          {!resourceList.length ? <></>:<Resources data={resourceList}></Resources> }
          {!handoutTestimonialList.length ? <></>:<TestimonialsOrHandouts data={handoutTestimonialList}></TestimonialsOrHandouts> }
        </Stack>
    </div>
  )
}
export default SolutionPages