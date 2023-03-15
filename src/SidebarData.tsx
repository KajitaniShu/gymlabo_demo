import React, {useEffect} from 'react'
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Accordion, Grid } from '@mantine/core';

async function formUpdate(form: any, data: any, index: number, database: any, setDatabase: any, contentsIndex: any) {

  let _database = await database.slice(0, database.length);
  _database[contentsIndex].json[index].position = [form.values.pos_x, form.values.pos_y, form.values.pos_z];
  _database[contentsIndex].json[index].rotation = [form.values.rot_x, form.values.rot_y, form.values.rot_z];
  _database[contentsIndex].json[index].scale    = [form.values.scale_x, form.values.scale_y, form.values.scale_z];
  _database[contentsIndex].json[index].name     = form.values.name;
  
  //setDatabase(_database);
}

export function SidebarData({database, setDatabase, data, index, contentsIndex }:any) {
  const form = useForm({
    initialValues: {
      name:   "",

      pos_x:  0.0,
      pos_y:  0.0,
      pos_z:  0.0,

      rot_x:  0.0,
      rot_y:  0.0,
      rot_z:  0.0,

      scale_x:  0.0,
      scale_y:  0.0,
      scale_z:  0.0,
    },

    validate: {
      name: (value) => (value.length > 20 ? '名前は20文字以内で入力してください' : null),
    },
  });

  form.values.name    = data.name;

  form.values.pos_x   = data.position[0];
  form.values.pos_y   = data.position[1];
  form.values.pos_z   = data.position[2];

  form.values.rot_x   = data.rotation[0];
  form.values.rot_y   = data.rotation[1];
  form.values.rot_z   = data.rotation[2];

  form.values.scale_x = data.scale[0];
  form.values.scale_y = data.scale[1];
  form.values.scale_z = data.scale[2];


  return (
    <Accordion.Item  value={"object"+index} key={index}>
      <Accordion.Control>
        <TextInput description="name" placeholder="名前を入力してください" {...form.getInputProps('name')} />
      </Accordion.Control>
      <Accordion.Panel>
      <Grid>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="position x" placeholder="position x" {...form.getInputProps('pos_x')}/></Grid.Col>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="position y" placeholder="position y" {...form.getInputProps('pos_y')}/></Grid.Col>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="position z" placeholder="position z" {...form.getInputProps('pos_z')}/></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="rotation x" placeholder="rotation x" {...form.getInputProps('rot_x')}/></Grid.Col>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="rotation y" placeholder="rotation y" {...form.getInputProps('rot_y')}/></Grid.Col>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="rotation z" placeholder="rotation z" {...form.getInputProps('rot_z')}/></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="scale x" placeholder="scale x" {...form.getInputProps('scale_x')}/></Grid.Col>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="scale y" placeholder="scale y" {...form.getInputProps('scale_y')}/></Grid.Col>
        <Grid.Col span={4}><NumberInput onChange={formUpdate(form, data, index, database, setDatabase, contentsIndex)} disabled precision={5} radius="md" hideControls description="scale z" placeholder="scale z" {...form.getInputProps('scale_z')}/></Grid.Col>
      </Grid>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
