import React, {useEffect, useState} from 'react'
import { Modal, Container, Title, Text, List, ThemeIcon, Group, Button, Badge, createStyles, Paper, useMantineTheme  } from '@mantine/core';
import { Carousel, Embla, useAnimationOffsetEffect  } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  AccumulativeShadows, 
  RandomizedLight,
  OrbitControls,
  Stage
} from '@react-three/drei'
import { IconCheck, IconCalendarEvent } from '@tabler/icons';
import Scene from './Scene'
import { abort } from 'process';

const useStyles = createStyles((theme) => ({

  canvas: {
    position: 'absolute',
    top:0,
    right:0,
    width: '100%',
  },

  slide : {
    position: 'relative'
  },

  discription: {
    width: '100%',
    position: 'absolute',
    zIndex:10,
  },
}));


const confRoom=[
  { name: "ルーム1-1", path: "/conference_room/work1_1.glb", facility: ["ホワイトボード", "モニター"]}, 
  { name: "ルーム1-2", path: "/conference_room/work1_2.glb", facility: ["ホワイトボード", "モニター"]}, 
  { name: "ルーム1-3", path: "/conference_room/work1_3.glb", facility: ["ホワイトボード", "モニター"]}, 
  { name: "ルーム1-4", path: "/conference_room/work1_4.glb", facility: ["ホワイトボード", "モニター"]}, 
  { name: "ルーム1-5", path: "/conference_room/work1_5.glb", facility: ["ホワイトボード", "モニター"]}, 
  { name: "ルーム1-6", path: "/conference_room/work1_6.glb", facility: ["ホワイトボード", "モニター"]}, 
  { name: "ルーム1-7", path: "/conference_room/work1_7.glb", facility: ["ホワイトボード", "モニター"]}, 
  ];



export function More({modalOpened, modalHandlers}: any) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, 200);
  return (
    <>
      <Modal 
        opened={modalOpened} 
        onClose={()=> modalHandlers.close()} 
        radius="md"
        overflow="inside" 
        size={mobile ? "100%" : "xl"}
        transitionDuration={200}
        centered={true} 
        title={<Text weight={500} color="dimmed">会議室</Text>}
      >
          <Carousel
            getEmblaApi={setEmbla}
            withIndicators 
            height={"50vh"}
            draggable={false} 
            controlSize={30}
            loop
      >
        
          {confRoom.map((item:any, index:number) => { return (
            <Carousel.Slide className={classes.slide}>
              <div className={classes.discription}>
                {item.facility.map((item:any, index:number) => { return (
                  <Badge ml={"sm"}>{item} </Badge>
                )})}
                <Title mt="sm" ml="sm">
                  {item.name}
                </Title>
                <Button mt="sm" ml="sm" component="a" color="dark" href="#" variant="outline" style={{zIndex:"2"}} leftIcon={<IconCalendarEvent size={18} />}>
                  予約を確認
                </Button>
              </div>
              <Canvas 
                shadows 
                className={classes.canvas}
              >
                <Stage>
                <OrbitControls/>
                <Environment preset="city" />
                <Scene modelPath={item.path}/>
                </Stage>
              </Canvas>
        </Carousel.Slide>
          )})}
        </Carousel>
      </Modal>
    </>
  );
}
