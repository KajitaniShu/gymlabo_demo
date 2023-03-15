import { useState, useEffect } from 'react';
import {
  createStyles, 
  Accordion, 
  Navbar,
  ScrollArea,
  NumberInput, 
  TextInput, 
  Button
} from '@mantine/core';
import {
  IconLogout,
  IconDeviceTv,
  IconEdit,
  IconUserCircle,
  IconTelescope,
  IconCalendarEvent 
} from '@tabler/icons';

import { useDisclosure } from '@mantine/hooks';
import { PageNotFound } from './PageNotFound';
import { Login } from './Login';
import { db }  from './firebase';
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth } from './firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { ContentsList } from './ContentsList'
import { Editor } from './Editor'
import { SidebarData } from './SidebarData';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon:any = getRef('icon');
    return {
      header: {
      color: '#393E46',
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    item: {
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: "indigo.1" })
          .background,
        color: theme.fn.variant({ variant: 'light', color: "indigo.6" }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: "indigo.6" }).color,
        },
      },
    },
  }
});


const link = [
  { link: '/', label: '施設案内', icon: IconDeviceTv },
  { link: '/account', label: 'アカウント', icon: IconUserCircle },
  { link: '/gymEvent', label: 'GYMLABOイベント', icon: IconCalendarEvent },
];

interface SidebarProps {
  active:  any,
  setActive: any,
}

export function Sidebar({active, setActive}: SidebarProps) {
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

  const links = link.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        toggle();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  
  return (
    <ScrollArea offsetScrollbars scrollbarSize={6}>
      {(() => {
        
          return (
            <>
              <Navbar.Section grow>
                {links}
              </Navbar.Section>
              <Navbar.Section className={classes.footer}>
                <a href="/" className={classes.link} onClick={() => auth.signOut()}>
                  <IconLogout className={classes.linkIcon} stroke={1.5} />
                  <span>Logout</span>
                </a>
              </Navbar.Section>  
              <Navbar.Section className={classes.footer}>
                <a href="https://www.gymlabo.kyutech.jp/" className={classes.link}>
                  <span>GYMLABOホームページ</span>
                </a>
              </Navbar.Section>
            </>
          );
      })()}
    </ScrollArea>












    
  )
}
