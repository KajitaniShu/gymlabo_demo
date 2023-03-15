import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Avatar,
  MediaQuery,
  Group,
  Code,
  Title,
  Burger,
  createStyles,
  useMantineTheme,
  ScrollArea,
  Button,
  Image,
  Box,
  Card,
  SimpleGrid,
  Badge,
  Text,
  ActionIcon,
  Container,
  TextInput,
  Space,
  Divider
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { IconBookmark, IconShare, IconMenu2  } from '@tabler/icons';

import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { PageNotFound } from './PageNotFound';
import { Login } from './Login';
import { db }  from './firebase';
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth } from './firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { ContentsList } from './ContentsList'
import { Editor } from './Editor'
import { Sidebar } from './Sidebar'
import { IconSearch, IconCalendarTime } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const data = [
  {
    title: 'ボードゲーム交流会',
    description:
      '第2回ボードゲーム交流会まであと1週間！みんなで遊べるボードゲームを通して、ゆる～く交流しましょ♪応募はこちらのURLからおねがいします',
    category: '交流会',
    footer: '2023/1/25',
  },
  {
    title: 'もくもく会 in GYMLABO',
    description:
      'みなさん期末テストに向けて気合十分ですか？卒論・修論の進捗はどうですか？      1月31日(火)〜朝の時間を使って「もくもく会」をやります！みんなで集まって集中して作業しませんか？たくさんの参加お待ちしています！',
    category: 'イベント',
    footer: '2023/1/31, 2023/2/7, 2023/2/14',
  },
  {
    title: 'ジムトーーク',
    description:
      '【ジムトーーク Ver.2on2開催予告！】GYMLABOの名物トークイベント「ジムトーーク」。今回のテーマは邦ロック！友達といっしょに参加して、存分に語り合おう！参加は画像のQRまたはこちらのURLから',
    category: 'イベント',
    footer: '2023/2/10, 2023/2/14, 2023/2/22',
  },
  {
    title: '九工大起業家コンテスト',
    description:
      '3月3日、GYMLABOにて「起業家コンテスト2023」を開催します！詳細は下記をご確認ください👀',
    category: 'コンテスト',
    footer: '2023/3/3',
  },
];



export default function GymEvent({setOpen}:any) {
  const [user, initialising] = useAuthState(auth);
  const [contentsIndex, setContentsIndex] = useState<string>("");
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('一覧');
  const [database, setDatabase] = useState<any>(); 
  const { width, height } = useViewportSize();

  const items = data.map(({title, description, category, footer}) => (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Badge>{category}</Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {title}
      </Text>
      <Text lineClamp={2} size="md" color="dimmed">
        {description}
      </Text>
      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {footer}
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  ));
  

  return (

    <Container>
      <Header height={70} p="md">
        <Group style={{
          paddingBottom: theme.spacing.md,
          marginBottom: theme.spacing.md * 1.5}} 
        >
          
          <ActionIcon
            size="xl"
            style={{
              zIndex: 10,
            }}
            color="gray"
            bg="white"
            onClick={() => setOpen(true)}
              >
              <IconMenu2 size={20} />
          </ActionIcon>
          <Button color="gray" variant="subtle"  component="a" href="/"><Title color="gray.7" order={3} >GYMLABOイベント</Title></Button>
        </Group>
        <Group position="center" my="xl">
      </Group>
      </Header>
      <Space h="md" />
      <Card withBorder radius="md" px={50} py={30} my={"xl"} className={classes.card}>
      <TextInput
          icon={<IconSearch size={14} stroke={1.5} />}
          placeholder="イベント名で検索"
          mt="md"
          label="イベント名"
          name="検索"
        />
        <DateRangePicker
        icon={<IconCalendarTime  size={14} stroke={1.5} />}
        dropdownPosition="bottom-start" 
        mt="md"
        w={200}
        label="日付"
        placeholder="日付で絞る"
        dropdownType="modal"
      />
      <Button
      styles={(theme) => ({
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          float:"right",
          '&:hover': {
            backgroundColor: theme.fn.darken('#00acee', 0.05),
          },
        },

        leftIcon: {
          marginRight: 15,
        },
      })}
    >
      検索
    </Button>
      
    </Card>
    <Space h="md" />

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}