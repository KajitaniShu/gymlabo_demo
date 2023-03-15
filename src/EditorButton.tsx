import { useState } from 'react';
import { createStyles, Box, Group, Affix, Menu, Button } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { storage, db } from './firebase';
import { ref, uploadString } from "firebase/storage";
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import {
  IconBrightnessUp,
  IconSearch,
  IconCamera 
} from '@tabler/icons';


const useStyles = createStyles((theme) => ({
  buttonlist: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    zIndex:2
  }
}));


async function uploadData(data: any, setIsUploading: any) {
  const id     = data.id;
  const json   = JSON.stringify(data.json);
  const update = Timestamp.now();
  const uuid   = data.uuid;
  const name   = data.name;
  await setDoc(doc(db, "user-data", id), {uuid: uuid, name: name, json: json, update: update});
}


export function EditorButton({database, setDatabase, contentsIndex}: any) {
  const { classes } = useStyles();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useHotkeys([
    ['ctrl+s', () => uploadData(database[contentsIndex], setIsUploading)],
  ]);

  async function addObj(type: "lazer" | "lens" | "camera" | "box" | "cylinder" | "sphere") {
    let _database = await database.slice(0, database.length);
    const index = database[contentsIndex].length;

    _database[contentsIndex].json.push({
      'type':     type,
      'name':     type,
      'position': [0.0, 0.0, 0.0],
      'rotation': [0.0, 0.0, 0.0],
      'scale':    [1.0, 1.0, 1.0],
    });

    setDatabase(_database);
  }
  

  return (
      <Button.Group className={classes.buttonlist}>
      
      <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="default">追加</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item value="lazer" onClick={() => addObj("lazer")} icon={<IconBrightnessUp size={14} />}>レーザー</Menu.Item>
        <Menu.Item value="lens" onClick={() => addObj("lens")} icon={<IconSearch size={14} />}>レンズ</Menu.Item>
        <Menu.Item value="camera" onClick={() => addObj("camera")} icon={<IconCamera size={14} />}>カメラ</Menu.Item>
      </Menu.Dropdown>
    </Menu>
      <Button variant="default">表示</Button>
      <Button variant="default" onClick={() => uploadData(database[contentsIndex], setIsUploading)}>保存</Button>
    </Button.Group>
  );
}