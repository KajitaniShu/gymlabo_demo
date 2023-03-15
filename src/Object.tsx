import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { TransformControls, Select, Line, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls, useGLTF } from '@react-three/drei'
import { TransformButton } from './TransformButton'
import { EditorButton } from './EditorButton'
import { useForm } from '@mantine/form';
import { Vector3, Quaternion } from 'three';
import { Object3D } from 'three'
import { Group } from '@mantine/core';
import { Timestamp } from 'firebase/firestore';



interface ObjectProps {
  database: any,
  setDatabase: any,
  data:     any,
  contentsIndex: any,
  index:    number,
  mode:     "none" | "translate" | "rotate" | "scale"
}

export function Object({database, setDatabase, data, index, contentsIndex, mode/*, type*/}: ObjectProps) {
  /*
  const lazer_model   = useGLTF("models/laser.glb");
  const lens_model    = useGLTF("models/lens.glb");
  const camera_model  = useGLTF("models/camera.glb");
  const lazer         = lazer_model.scene.clone();
  const lens          = lens_model.scene.clone();
  const camera        = camera_model.scene.clone();

  const obj = [
    { type: "box", obj: <boxBufferGeometry/>},
    { type: "tube", obj: <tubeBufferGeometry/>},
    { type: "cylinder", obj: <coneBufferGeometry/>},
    { type: "lazer", obj: <primitive object={lazer} roughness={0} smoothness={10} />},
    { type: "lens", obj: <primitive object={lens} roughness={0} smoothness={10} />},
    { type: "camera", obj: <primitive object={camera} roughness={0} smoothness={10} />},
  ];
  */
  async function hundleChange (ref: any) {

    let _database = await database.slice(0, database.length);
    _database[contentsIndex].json[index].position = [ref.current.parent.position.x, ref.current.parent.position.y, ref.current.parent.position.z];
    _database[contentsIndex].json[index].rotation = [ref.current.parent.rotation._x, ref.current.parent.rotation._y, ref.current.parent.rotation._z];
    _database[contentsIndex].json[index].scale    = [ref.current.parent.scale.x, ref.current.parent.scale.y, ref.current.parent.scale.z];

    setDatabase(_database);
  }

  const props = {
    ...(mode !== "none" && {mode:mode}),
    ...(mode === "none" && {enabled:true})
  };
  
  const ref = useRef<any>();
  if(mode !== "none"){
    return (
      <TransformControls 
        mode={mode}
        onMouseUp={(e) => {  if(e) hundleChange(ref) }} 
        translationSnap={1} 
        position={[data.position[0], data.position[1], data.position[2]]}
        rotation={[data.rotation[0], data.rotation[1], data.rotation[2]]}
        scale=   {[data.scale[0],    data.scale[1],    data.scale[2]]}
      >
        <mesh castShadow matrixAutoUpdate={true} ref={ref} receiveShadow >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </TransformControls>
    )
  }else{
    return (
      <mesh 
        castShadow 
        matrixAutoUpdate={true} 
        ref={ref} 
        receiveShadow 
        position={[data.position[0], data.position[1], data.position[2]]}
        rotation={[data.rotation[0], data.rotation[1], data.rotation[2]]}
        scale=   {[data.scale[0],    data.scale[1],    data.scale[2]]}
        >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
    )
  }
}
