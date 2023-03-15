import { useRef, FC, useEffect, useState } from 'react'
import { ThreeEvent, useFrame, useThree} from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei'
import { Vector3, Plane} from 'three';
import { useDrag } from "@use-gesture/react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"; 
import {
  setNavigationProgress,
  resetNavigationProgress,
  completeNavigationProgress
} from '@mantine/nprogress';

interface PlayerProps {
  modelPath: string,
  playerRef: any,
  path: {name: string, coord: number[], wait: number}[],
  pathIndex: number, 
  setPathIndex: any,
  isSpot: any,
  handlers: any,
  modalOpened: any
}


const Player: FC<PlayerProps> = ({ modelPath, playerRef, path, pathIndex, setPathIndex, isSpot, handlers, modalOpened }) => {
  const player = useRef({position: new Vector3(0.0, 0.0, 0.0), rotation: new Vector3(0.0, 0.0, 0.0)});
  //player.current.position = playerRef.current.position;
  //player.current.rotation = playerRef.current.rotation;
  const gltf = useGLTF(modelPath);
  const scene = gltf.scene;
  const animations = gltf.animations;








  
  const { actions } = useAnimations(animations, scene);
  // @ts-ignore
  const [target, setTarget] = useState(path[pathIndex].coord);
  const [wait, setWait] = useState(false);
  const waitTime = useRef(0);
  
  const { camera, gl } = useThree();
  const orbitControls = useRef<OrbitControlsImpl>(null!);

  // @ts-ignore
  camera.aspect = document.body.clientWidth / document.body.clientHeight;

  const move = (speed: number, yaw: number, pitch: number) => {
    player.current.position.x += speed * Math.cos(yaw);
    orbitControls.current.object.position.x += speed * Math.cos(yaw);
    player.current.position.z += speed * Math.sin(yaw);
    orbitControls.current.object.position.z += speed * Math.sin(yaw);
    player.current.position.y += speed * Math.sin(pitch);
    orbitControls.current.object.position.y += speed * Math.sin(pitch);
    player.current.rotation.y = -yaw+Math.PI/2;
  }

  const calcDirection = (): [number, number, number]  => {
    // @ts-ignore
    const _player = player.current.position;
    var speed: number = 1.0;
    var yaw: number = 0.0;
    var pitch: number = 0.0;
    
    yaw = Math.atan2(target[2] - _player.z, target[0] - _player.x);
    pitch = Math.atan2(target[1] - _player.y, Math.sqrt((target[2] - _player.z)**2+(target[0] - _player.x)**2));
    return [yaw, pitch, speed*2];
  }

  
  useFrame((_, delta) => {
    if(player) {  // キャラクターが作成済み

      console.log(target)
      if(!wait) { // 待機中でない
        if(Math.abs(target[0] - player.current.position.x) + Math.abs(target[2] - player.current.position.z) > 0.2){  // 目的地に向かって歩く
          
          var yaw : number = 0.0, pitch : number = 0.0, speed: number = 0.0;
          [yaw, pitch, speed] = calcDirection();
          move(delta * speed, yaw, pitch);

          // 走るアニメーションを再生
          // @ts-ignore
          if(actions.Idle?.isRunning) {actions.Idle?.fadeOut(); actions.Idle?.reset();}
          actions.Run?.play();
          
        }else{  // 目的地に到着した場合
          
          // 目的地を更新
          if( path[pathIndex].wait > 0) { setWait(true); }                   // 待機時間が設定されていたら，待機フラグを立てる
          else if(pathIndex < path.length-1) { setPathIndex(pathIndex+1); }  // 待機フラグがなければ目的地を一つ先に更新
          else setPathIndex(0);                                              // 最終目的地まで到達したら目的地をスタート地点に戻す
          setTarget(path[pathIndex].coord);                                  // 

          // 待機アニメーションを再生
          // @ts-ignore
          if(actions.Run?.isRunning) {  actions.Run?.fadeOut(); actions.Run?.reset();}
          actions.Idle?.play();
        }
      
        orbitControls.current.target = new Vector3(player.current.position.x, player.current.position.y+1.5, player.current.position.z);
        orbitControls.current.setAzimuthalAngle( player.current.rotation.y+Math.PI );
        orbitControls.current.setPolarAngle(Math.PI/2-0.04);
        orbitControls.current.setPolarAngle(Math.PI/2-0.04);
      
      } else {  // 待機中
        // 待機アニメーションを再生
        // @ts-ignore
        if(actions.Run?.isRunning) {  actions.Run?.fadeOut(); actions.Run?.reset(); }
        actions.Idle?.play();

        if(waitTime.current > path[pathIndex].wait) {                   // 待機時間経過したら待機状態から抜ける
          if(!modalOpened) completeNavigationProgress();                // モーダルが開いていないのであればナビゲーションを終わらせる
          setWait(false); 
          waitTime.current = 0; 
          handlers.close();
          
          if(pathIndex < path.length-1) { setPathIndex(pathIndex+1); }  // 待機フラグがなければ目的地を一つ先に更新
          else setPathIndex(0);                                         // 最終目的地まで到達したら目的地をスタート地点に戻す
          setTarget(path[pathIndex].coord);
        
        } else {                                                        // 待機時間中はwaitTimeを加算
          if(!isSpot) handlers.open();
          if(!modalOpened) {                                            // モーダルが開いていない場合はwaitTimeを加算
            waitTime.current += delta;
            setNavigationProgress(waitTime.current * 20+8);
          }
        }             
      }
    }
  });

  useEffect(() => {
    
    orbitControls.current.target = new Vector3(player.current.position.x, player.current.position.y+1.5, player.current.position.z);
    orbitControls.current.setAzimuthalAngle( player.current.rotation.y+Math.PI );
    orbitControls.current.setPolarAngle(Math.PI/2-0.04);
    orbitControls.current.setPolarAngle(Math.PI/2-0.04);
    
  }, []);


  
  return (
    <>
    <PerspectiveCamera makeDefault  />
    <OrbitControls
      ref={orbitControls}
      enableRotate={true}
      enablePan={true}
      minDistance={2}
      maxDistance={3}
      dampingFactor={0.008}
      rotateSpeed={0.4}
      makeDefault 
    />
    {/* @ts-ignore */}
    <mesh castShadow receiveShadow scale={[0.5, 0.5, 0.5]} position={playerRef.current.position} ref={player} rotation={[0, Math.PI, 0]}>
      <primitive
        object={gltf.scene}
      />
    </mesh>
    </>
  )
}

export default Player