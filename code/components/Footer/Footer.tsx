import { createStyles, Text, Container, rem } from '@mantine/core';
import Image from 'next/image'
import image12 from '../../src/styles/image12.png'

const useStyles = createStyles((theme) => ({
  footer: {
    // position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    bottom: rem(0), 
    // height: rem(200),
    width: '100%',
    marginTop: rem(20),
    paddingTop: `10px`,
    paddingBottom: `calc(${theme.spacing.xl})`,
    backgroundColor: '#254885',
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    boxShadow:'0px 2px 30px rgba(180, 180, 180, 0.25)'
  },

  logo: {
    maxWidth: rem(200),
    paddingRight: `20px`,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',
    width: rem(230),

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: 'block',
    color: '#FFFFFF',
    fontFamily:'Inter',
    fontStyle:'normal',
    fontWeight:400,
    fontSize: '12px',
    lineHeight:'15px',
    paddingTop: rem(10),
    paddingBottom: rem(3),

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

interface FooterLinksProps {
  data: {
    links: { label: string; link: string }[];
  }[];
}

export function FooterLinks({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        fz = "sm"
        
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper}>
        {links}
      </div>
    );
  });
  console.log(groups)

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {/* original size settings */}
          <Image alt='Best hospitals logo' src={image12} width={69.5} height={80}/>
          {/* slightly bigger image, could fit better on desktop site */}
          {/* <Image alt='Best hospitals logo' src={image12} size={20}/> */}
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
    </footer>
  );
}