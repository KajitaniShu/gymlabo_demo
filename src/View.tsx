import { useRef, useEffect, useState } from 'react';


import { useParams, useLocation } from 'react-router-dom'
import {collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db }  from './firebase';
import { PageNotFound } from './PageNotFound';
import { consumers } from 'stream';
import { Paper, AppShell, Header, Group, createStyles, Button, Code, Title, ActionIcon, Drawer, useMantineTheme } from '@mantine/core';
import { useViewportSize  } from '@mantine/hooks';
import { IconMenu2  } from '@tabler/icons';

import {Gymlabo} from './Gymlabo';
import { Sidebar } from './Sidebar';
import GymJob from './GymJob';
import GymEvent from './GymEvent';


export function View({player, pathIndex, setPathIndex}: any) {
  const { width, height } = useViewportSize();
  const [open, setOpen] = useState(false);
  const theme = useMantineTheme();
  const [contentsIndex, setContentsIndex] = useState<string>("");
  const [active, setActive] = useState('施設案内');

    return (
      <AppShell style={{height: height}} >
        
        <Drawer
          opened={open}
          onClose={() => setOpen(false)}
          overlayOpacity={0.55}
          overlayBlur={3}
          padding="xl"
        >

        <Sidebar active={active} setActive={setActive} /> 
        </Drawer>
        {(() => {
          if(active==='施設案内')             return <Gymlabo playerRef={player} pathIndex={pathIndex} setPathIndex={setPathIndex} setOpen={setOpen}/>;
          else if(active==='アカウント')      return <PageNotFound setOpen={setOpen}/>;
          else if(active==='GYMLABO就活')     return <GymJob setOpen={setOpen}/>;
          else if(active==='GYMLABOイベント') return <GymEvent setOpen={setOpen}/>;
          else                                return <PageNotFound setOpen={setOpen}/>;
        })()
      }
        
      </AppShell>
    )
}