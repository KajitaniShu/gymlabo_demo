import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, TransformControls, Line, Text, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls, Edges } from '@react-three/drei'
import { TransformButton } from './TransformButton'
import { EditorButton } from './EditorButton'
import { Object } from './Object'
import { useForm } from '@mantine/form';


softShadows()

interface EditorProps {
  database:  any,
  setDatabase: any,
  contentsIndex: any,
  setContentsIndex: any
  uuid: string
}


function hundleChange (ref: any) {
  console.log(ref.current.position, ref.current.rotation, ref.current.scale);
}



export function Editor({ database, setDatabase, contentsIndex, setContentsIndex, uuid }: EditorProps) {
  const [mode, setMode] = useState<"none" | "translate" | "rotate" | "scale">("none");
  
  return (
    <>
      <EditorButton database={database} setDatabase={setDatabase} contentsIndex={contentsIndex} />
      <TransformButton setMode={setMode} />
      <Canvas 
        
        shadows 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        raycaster={{ params: { Line: { threshold: 0.15 } } }} 
        camera={{ position: [-10, 10, 10], fov: 20 }}>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]} />
        </directionalLight>
        {(database[contentsIndex] && database[contentsIndex].json !== "") && database[contentsIndex].json.map((_data: any, index: number) => (
          <Object database={database} setDatabase={setDatabase} data={_data}  index={index} contentsIndex={contentsIndex} mode={mode} key={index} />
        ))}
        
        <mesh scale={1000} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry />
          <shadowMaterial transparent opacity={0.5} />
          <Edges/>
        </mesh>
        <OrbitControls makeDefault />
        <gridHelper args={[100, 100]} />
        <axesHelper args={[50]} />
        <GizmoHelper alignment="top-right" margin={[80,120]}>
      
        <group scale={1} position={[-10, -10, -10]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} hideNegativeAxes />
        </group>
        
      </GizmoHelper>
      </Canvas>
    </>
  )
}