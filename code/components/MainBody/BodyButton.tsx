// BodyButton.tsx
import React from 'react';
import { Stack } from '@mantine/core';
import { createStyles, rem } from '@mantine/core';
import ToggleButton from './ToggleButton';

const useStyles = createStyles(() => ({
  inner: {
    height: '60px',
    display: 'flex',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rem(10),
    alignContent: 'center',
  },

  outer: {
    paddingTop: rem(50),
    paddingLeft: '10%',
  },
}));

const BodyButton: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Stack
      h={300}
      className={classes.outer}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    >
      <ToggleButton className={classes.inner} label="Communication" />
      <ToggleButton className={classes.inner} label="Computer Access" />
      <ToggleButton className={classes.inner} label="Home Access" />
      <ToggleButton className={classes.inner} label="Smart Phone Access" />
    </Stack>
  );
};

export default BodyButton;
