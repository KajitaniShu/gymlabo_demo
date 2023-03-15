import { FC } from 'react'
import { useGLTF } from '@react-three/drei'

interface SceneProps {
  modelPath: string
}

const Scene: FC<SceneProps> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)

  return (
    <>
      <group>
        <mesh castShadow receiveShadow>
          <primitive 
            object={gltf.scene}
            position={[0,0,0]}
            scale={[10, 10, 10]}
          />
        </mesh>
      </group>
    </>
  )
}

export default Scene