import {
  Title,
  createStyles,
  rem
} from '@mantine/core';
import { useState } from 'react';
import { IconChevronLeft} from '@tabler/icons-react';


let img = ""
const Titles = ({isHomePage, titleImg, title}:{isHomePage:boolean, titleImg: string, title: string}) => {
  img = titleImg
  const { classes} = useStyles();
  const ChevronIcon = IconChevronLeft;
  return (
    <div className={classes.wrapper}>
      { isHomePage ? <></> :
        <ChevronIcon
          className={classes.chevron}
          size="2.5rem"
          stroke={2.5}
          onClick={(event) => event.preventDefault()}
        />
      }
      <div className={classes.inner}>
        <Title className={classes.title}>
          {title}
        </Title>
      </div>
    </div>
  );
}

export default Titles;

const useStyles = createStyles((theme) => ({

  chevron: {
    transition: 'transform 200ms ease',
    position: "absolute", 
    left: "2.02%", 
    top: "15.36%", 
    color: "#FFFFFF"
  },
  wrapper: {
    position: 'relative',
    paddingTop: rem(10),
    paddingBottom: rem(100),
    backgroundImage: 'linear-gradient(0deg, rgba(0, 48, 135, 0.5), rgba(0, 48, 135, 0.5)), url('+img+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: rem(203),
    // width: "auto",

    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },
  inner: {
    position: 'absolute',
    width: rem(132),
    height: rem(41),
    left: rem(24),
    bottom: rem(24),
    // top: rem(130),
    zIndex: 1,
  },

  title: {
    fontWeight: 600,
    fontSize: rem(35),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    // paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    lineHeight: rem(51),

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(35),
      textAlign: 'left',
    },
  },

}));

