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
    title: 'GYMLABO クリスマスweek',
    description:
      '12/19（月）~12/23（金）期間、なんとGYMLABOで魅力的な企業さんとお話しできるというスーパースペシャルな機会を作りました！！',
    category: '就活イベント',
    footer: '2023/1/23',
    companies: ['ユニコネクト', 'ATOMica', '三井ハイテック', '野村総合研究所', 'OPTiM','ハウスインターナショナル' ]
  },
  {
    title: '○○株式会社 インターン募集',
    description:
      'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
    category: 'インターン',
    footer: '2023/1/22',
    companies: ['○○株式会社']
  },
  {
    title: '△△株式会社 会社説明会',
    description:
      'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
    category: '会社説明会',
    footer: '2023/1/22',
    companies: ['△△株式会社']
  },
];



export default function GymJob({setOpen}:any) {
  const [user, initialising] = useAuthState(auth);
  const [contentsIndex, setContentsIndex] = useState<string>("");
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('一覧');
  const [database, setDatabase] = useState<any>(); 
  const { width, height } = useViewportSize();

  const items = data.map(({title, description, category, footer, companies}) => (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Badge color="yellow">{category}</Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {title}
      </Text>
      <Text lineClamp={2} size="md" color="dimmed">
        {description}
      </Text>

      {companies.map((item: any, index: number) => {return (
        <Badge color="gray" size="xs" variant="outline" key={index}>{item}</Badge>
      )})}
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
          <Button color="gray" variant="subtle"  component="a" href="/"><Title color="gray.7" order={3} >GYMLABO就活</Title></Button>
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
      color="yellow"
      styles={(theme) => ({
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          float:"right",
          
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