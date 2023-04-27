import { createStyles, Text, Container, rem } from '@mantine/core';
import Image from 'next/image'
import image12 from '../../src/styles/image12.png'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'absolute',
    width: '100%',
    left:0,
    bottom:0, 
    marginTop: rem(120),
    margainbottom: rem(0),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: '#254885',
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    boxShadow:'0px 2px 30px rgba(180, 180, 180, 0.25)'
  },

  logo: {
    maxWidth: rem(200),
    alignItems: 'right',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: rem(20),
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: rem(40),

    [theme.fn.smallerThan('sm')]: {
      //if uncommented, this will hide the footer links on mobile
      //display: 'none',
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
    paddingTop: rem(3),
    paddingBottom: rem(3),
    textDecoration: 'none',

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
      <Link href={link.link} className={classes.link} key={index}>
        {/* onClick={(event) => event.preventDefault()} */}
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper}>
        {links}
      </div>
    );
  });
  //console.log(groups)

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