import React from 'react'
import { Stack, createStyles, rem , Text, AspectRatio} from '@mantine/core';
import { PageContentType } from '@/types/dataTypes';


const useStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '87%',
    // backgroundColor: 'transparent',
    color: '#254885',
    border: '2px solid #254885',
    borderRadius: rem(10),
    // width: rem(320),
    justifyContent: 'start',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',
    // '&:hover': {
    //     backgroundColor: '#254885',  color: "#FFFFFF",
    // },
  },

  text: {
    fontWeight: 600,
    paddingTop: rem(12),
    width: '80%',
    fontSize: rem(20),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    color: '#254885',
    // marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    // lineHeight: rem(16),
    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(20),
      textAlign: 'left',
      width: '80%'
    },
  },
  bodyText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    /* or 18px */
    color: '#74767B',
    textAlign:'left',
  },
  video: {
    align:'center',
    size:10,
  },

  outer: {
    paddingTop: rem(24),
    pddingBottom: rem(24),
    paddingLeft: '10%',
  },
}))


const PageContent = ({data}: {data: PageContentType[]}) => {
  const { classes } = useStyles()


  return (
    <div>
      <Stack
      spacing="xl"
    >
      <Text className={classes.text}> {"Resources"} </Text>
      {data.map((pageContent) => ( 
        <>
        <AspectRatio ratio={4/4} maw={2000} mah={500} className={classes.video}>
            {/* <iframe
                    src={pageContent.videoURL}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                /> */}
              <video>
                <source src={pageContent.videoURL} type="video/mp4"/>
              </video>
        </AspectRatio>
        <Text className={classes.bodyText}>
            {pageContent.paragraph}
        </Text>
        <AspectRatio ratio={4/4} maw={2000} mah={500} className={classes.video}>
            <iframe
                    src={pageContent.imageURL}
                />
        </AspectRatio>
        </>
      ))}
    </Stack>
    </div> 
  )
}

export default PageContent