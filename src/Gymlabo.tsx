import React from 'react'

import { 
  Environment, 
  AccumulativeShadows, 
  RandomizedLight 
} from '@react-three/drei'

import { 
  ActionIcon, 
  GroupedTransition 
} from '@mantine/core';

import { IconMenu2 } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { Canvas } from '@react-three/fiber'
import Player from './Player'
import Scene from './Scene'
import { Spotname } from './Spotname'
import { More } from './More'
import {
  NavigationProgress,
} from '@mantine/nprogress';

const path=[
  { name: "", coord: [-22, 0, -17], wait: 0}, 
  { name: "", coord: [-22, 0, -19], wait: 0},
  { name: "受付", coord: [ -17, 0, -22.5], wait: 5},
  { name: "受付", coord: [ -17, 0, -29], wait: 0},
  { name: "", coord: [ 6, 0, -29], wait: 0},
  { name: "", coord: [ 8, 0, -27], wait: 0},
  { name: "", coord: [ 8, 0, -26], wait: 0},
  { name: "会議室", coord: [ 8, 0, -25], wait: 5},
  { name: "会議室", coord: [ 8, 0, -15], wait: 0},
  { name: "", coord: [ 8, 0, -12], wait: 0},
  { name: "", coord: [ 8, 0.1, -10], wait: 0},
  { name: "", coord: [8, 0.1, -2.5], wait: 0},
  { name: "", coord: [9, 0.1, -2.5], wait: 0},
  { name: "", coord: [12.2, 1.8, -2.5], wait: 0},
  { name: "", coord: [12.2, 1.8, -4.3], wait: 0},
  { name: "", coord: [9, 3, -4.3], wait: 0},
  { name: "", coord: [5.8, 3, -4.3], wait: 0},
  { name: "", coord: [5.8, 3, -7.3], wait: 0},
  { name: "セミナールーム", coord: [5.8, 3, -10.3], wait: 5},
  { name: "セミナールーム", coord: [5.8, 3, -24.8], wait: 0},
  { name: "", coord: [-7, 3, -24.8], wait: 0},
  { name: "シェアオフィス", coord: [-9, 3, -24.8], wait: 5},
  { name: "シェアオフィス", coord: [-16, 3, -24.8], wait: 0},
  { name: "", coord: [-19, 3, -22], wait: 0},
  { name: "", coord: [-23, 3, -22], wait: 0},
  { name: "高集中ブース", coord: [-23, 3, -10], wait: 5},
  { name: "高集中ブース", coord: [-20, 3, -6], wait: 0},
  { name: "", coord: [-18, 3, -7.2], wait: 0},
  { name: "", coord: [-17, 2.6, -8], wait: 0},
  { name: "", coord: [-17, 2.2, -9], wait: 0},
  { name: "", coord: [-16.8, 1.8, -9.5], wait: 0},
  { name: "", coord: [-17.4, 1.4, -10], wait: 0},
  { name: "", coord: [-18.3, 1, -10.9], wait: 0},
  { name: "", coord: [-19, 0.5, -10.9], wait: 0},
  { name: "", coord: [-20, 0, -10.9], wait: 0},
  { name: "", coord: [-28, 0, -10.9], wait: 0},
  { name: "", coord: [-28, 0, -17], wait: 0}];


export function Gymlabo({playerRef, pathIndex, setPathIndex, setOpen}: any){
  const [isSpot, handlers] = useDisclosure(false);
  const [modalOpened, modalHandlers] = useDisclosure(false);

  
  return (
    <>
    <NavigationProgress autoReset size={4}/>
    <ActionIcon
      size="xl"
      radius="xl" 
      style={{
        zIndex: 10,
      }}
      variant="light"
      bg="white"
      color="indigo"
      onClick={() => setOpen(true)}
    >
      <IconMenu2 size={20} />
    </ActionIcon>
    <GroupedTransition 
      mounted={isSpot} 
      transitions={{
        name: { duration:400, transition: 'slide-right', timingFunction: 'ease' },
        button: { duration: 400, transition: 'slide-right', timingFunction: 'ease' },
      }}
    >
      {(styles) =>
        <Spotname isSpot={isSpot} modalHandlers={modalHandlers} spotName={path[pathIndex].name} styles={styles}/>
      }
    </GroupedTransition>
    <More modalOpened={modalOpened} modalHandlers={modalHandlers}/>
    <Canvas 
      shadows 
      style={{
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0
      }}
      raycaster={{ params: { Line: { threshold: 0.15 } } }} 
    >
      <Environment preset="city" />
      <AccumulativeShadows temporal frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
      </AccumulativeShadows>
      <ambientLight intensity={0.3} />
      
      <Scene modelPath={"/gymlabo.glb"}/>
      <Player modelPath={"/knight.glb"} playerRef={playerRef} path={path}  pathIndex={pathIndex} setPathIndex={setPathIndex} isSpot={isSpot} handlers={handlers} modalOpened={modalOpened}/>
      
    </Canvas>
    </>
  )
}
