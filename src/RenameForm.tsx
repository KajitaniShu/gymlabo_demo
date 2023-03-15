import React from 'react'
import { TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import {doc, Timestamp, setDoc } from 'firebase/firestore';
import { closeAllModals } from '@mantine/modals';
import { db }  from './firebase';

interface RenameFormProps {
  database:  any,
  setDatabase: any,
  id: any
  index: number
  name: string
}

async function renameList(database: any, setDatabase: any, id: any, index: number, name: any) {
  let _database = await database.slice(0, database.length);
  const json   = JSON.stringify(_database[index].json);
  const update = Timestamp.now();
  const uuid   = _database[index].uuid;

  await setDoc(doc(db, "user-data", id), {uuid: uuid, name: name, json: json, update: update});

  _database[index].name = name;
  _database[index].update = update;
  setDatabase(_database);
  closeAllModals();
}

export function RenameForm({database, setDatabase, id, index, name}: RenameFormProps) {
  const form = useForm({
    initialValues: {
      name: ''
    },

    validate: {
      name: (value) => (value.length > 20 ? '20文字以内で入力してください' : null),
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => renameList(database, setDatabase, id, index, values.name))}>
        <TextInput description="20文字以内" placeholder={name} data-autofocus {...form.getInputProps('name')} />
        <Group position="right">
          <Button  type="submit" mt="md">
            変更
          </Button>
        </Group>
      </form>
    </>
  )
}
