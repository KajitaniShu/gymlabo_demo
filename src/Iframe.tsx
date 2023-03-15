import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, TransformControls, Line, Text, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls } from '@react-three/drei'
import { Object } from './Object'
import { useParams, useLocation } from 'react-router-dom'
import {collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db }  from './firebase';
import { PageNotFound } from './PageNotFound';
import { consumers } from 'stream';
import { Paper } from '@mantine/core';
import { useViewportSize  } from '@mantine/hooks';

softShadows()

export function Iframe() {
  const { width, height } = useViewportSize();
  const { id } = useParams();
  const location = useLocation();
  const [database, setDatabase] = useState<any>(); 
  const [exist, setExist] = useState<any>(false);

  console.log(location.search)
  useEffect(() => {
    
    if(database === undefined && id !== undefined){
      const ref = doc(db, "user-data", id);
      const document = getDoc(ref).then((snapShot)=>{
        if (snapShot.exists()) {
          setExist(true);
          setDatabase(JSON.parse(snapShot.data().json))
        }
      })
    }
    
  }, []);
  if(exist){
    return (
      <Paper radius="md" p="md" withBorder bg="white" style={{position:"relative", height:height * 98/100, width:width * 99/100, marginTop: height * 1/100, marginLeft: width * 0.5/100 }}>  
        <Canvas 
          shadows 
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
          raycaster={{ params: { Line: { threshold: 0.15 } } }} 
          camera={{ position: [-10, 8, 10], fov: 20 }}>
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
            <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]} />
          </directionalLight>
          {(database && database !== "") && database.map((_data: any, index: number) => (
            <Object database={database} setDatabase={setDatabase} data={_data}  index={index} contentsIndex={0} mode={"none"} key={index} />
          ))}
          
          <mesh scale={1000} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry />
            <shadowMaterial transparent opacity={0.5} />
          </mesh>
          <OrbitControls makeDefault autoRotate={location.search === "?rotation=true" && true} />
          <gridHelper args={[100, 100]} />
          <axesHelper args={[50]} />
          <GizmoHelper alignment="top-right" margin={[80,80]}>
        
          <group scale={1} position={[-10, -10, -10]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} hideNegativeAxes />
          </group>
          
        </GizmoHelper>
        </Canvas>
      </Paper>
    )
  }else{
    return <PageNotFound />
  }
}