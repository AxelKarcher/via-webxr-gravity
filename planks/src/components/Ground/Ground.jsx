import {RigidBody} from '@react-three/rapier'

const Ground = () => {
  return (
    <RigidBody type='fixed'>
      <mesh position={[1, -1, 1]} castShadow receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshBasicMaterial color='grey' />
      </mesh>
    </RigidBody>
  )
}

export default Ground