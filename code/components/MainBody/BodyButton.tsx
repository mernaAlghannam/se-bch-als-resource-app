import React from 'react';
import { Stack, Button } from '@mantine/core';
import { createStyles, Header, Container, Group, Burger, Image, rem, Text} from '@mantine/core';


const useStyles = createStyles(() => ({
  inner: {
    height: "60px",
    display: 'flex',
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rem(10),
    alignContent: 'center'
    
  },

  outer:{
    paddingTop: rem(50),
    paddingLeft: '10%',
  }
}))

const BodyButton = () => {
  const { classes } = useStyles();
  return (
    <Stack h={300} className={classes.outer} sx = {(theme) => ({backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8]: theme.colors.gray[0]})}>
      <Button className={classes.inner} variant='outline'><Text fz="xl">Communication</Text></Button>
      <Button className={classes.inner} variant='outline'><Text fz="xl">Computer Access</Text></Button>
      <Button className={classes.inner} variant='outline'><Text fz="xl">Home Access</Text></Button>
      <Button className={classes.inner} variant='outline'><Text fz="xl">Smart Phone Access</Text></Button>
    </Stack>
  )
}

export default BodyButton