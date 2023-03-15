import { useState, useEffect, Suspense } from 'react';
import { createStyles, Table, ActionIcon, ScrollArea, Group, Box, Menu, UnstyledButton, Text, Container, Button, Paper, TextInput  } from '@mantine/core';
import { openConfirmModal, openModal } from '@mantine/modals';
import { IconDotsVertical, IconEdit, IconTrash, IconDeviceTv, IconCode  } from '@tabler/icons';
import {collection, doc, addDoc, getDocs, query, where, Timestamp, deleteDoc, setDoc } from 'firebase/firestore';
import { db }  from './firebase';
import { RenameForm } from './RenameForm'
import { useClipboard } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,

    },
  },
}));

interface ContentsListProps {
  database:  any,
  setDatabase: any,
  setActive: any,
  setContentsIndex: any
  uuid: string
}

async function addItem(database: any, setDatabase: any, uuid: any) {
  let _database = await database.slice(0, database.length);
  const name   = "タイトルなし";
  const json   = "";
  const update = Timestamp.now();

  const newData = await addDoc(collection(db, "user-data"), {
    uuid: uuid,
    name: name,
    json: json,
    update: update
  });
  
  _database.unshift({id: newData.id, name: name, json: json, update: update})
  setDatabase(_database)
}

async function deleteItem(database: any, setDatabase: any, id: any, index: number) {
  let _database = await database.slice(0, database.length);

  deleteDoc(doc(db, "user-data", id));
  const deleted_database = _database.splice(index, 1);
  setDatabase(_database)
}



export function ContentsList({ database, setDatabase, setActive, setContentsIndex, uuid }: ContentsListProps) {
  const { classes, cx } = useStyles();
  const clipboard = useClipboard();
  const [selection, setSelection] = useState([1]);
  const deleteModal = (id: any, index: number) =>
    openConfirmModal({
      title: '本当に削除しますか？',
      centered: true,
      children: (
        <Text size="sm">
          この操作は元に戻せません．
        </Text>
      ),
      labels: { cancel: "キャンセル", confirm: '削除する'},
      confirmProps: { color: 'red' },
      onCancel: () => "",
      onConfirm: () => deleteItem(database, setDatabase, id, index),
  });
  
  const renameModal = (id: any, index: number, old_name: string) => {
    openModal({
      title: '新しい名前を入力してください',
      centered: true,
      children: (
        <RenameForm database={database} setDatabase={setDatabase} id={id} index={index} name={old_name}/>
      ),
  })
  
  };



  return (
    <Suspense>
    <Container>
        <Group mt={60} mb={30}>
                <Button onClick={() => addItem(database, setDatabase, uuid)}  radius="sm" color="indigo.5" size="sm" className={classes.control}>
                  新規作成
                </Button>
                
              </Group>
      <Paper p="xl" withBorder>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} horizontalSpacing="xl" verticalSpacing="sm" fontSize="xs">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>update</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {database.map((item: any, index: number) => {return (
    
            <tr key={item.id} >
                  <td>
                    <UnstyledButton onClick={() => {setContentsIndex(index); setActive("エディタ")}}>
                      <Text size="sm" weight={500}>
                        {item.id}
                      </Text>
                      </UnstyledButton>
                  </td>
                  <td>
                      <Text size="sm" weight={500}>
                        {item.name}
                      </Text>
                  </td>
                  <td>
                      <Text size="sm" weight={500}>
                        {String(item.update.toDate().toLocaleString())}
                      </Text>
                  </td>
                
                <td>
                  
                  <Menu withArrow position="left">
                  <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size={18} />
                  </ActionIcon>
                    </Menu.Target>
                  <Menu.Dropdown>
                  <Menu.Item icon={<IconEdit size={14} />}  onClick={() => renameModal(item.id, index, item.name)}>名前を変更</Menu.Item>
                  <Menu.Item icon={<IconDeviceTv size={14} />}  component="a" href={"/view/"+item.id+"?rotation=true"}>プレビューを表示</Menu.Item>
                  <Menu.Item icon={<IconCode  size={14} />}  onClick={() => 
                    clipboard.copy('<iframe width="1280" height="720" src="https://kougaku-editor.web.app/iframe/' + item.id + '?rotation=true"></iframe>')} >
                    埋め込みコードをコピー
                    </Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} onClick={() => deleteModal(item.id, index)} color="red">削除</Menu.Item>
                  </Menu.Dropdown>
                  </Menu>
                </td>
              </tr>
          )})}
          </tbody>
        </Table>
      </ScrollArea>
      </Paper>
    </Container>
    </Suspense>
  );
}