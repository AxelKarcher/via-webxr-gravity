import {RigidBody} from '@react-three/rapier'
import {Edges} from '@react-three/drei'

const Ground = () => (
  <RigidBody type='fixed'>
    <mesh position={[1, -1, 1]}>
      <boxGeometry args={[15, 1, 15]} />
      <Edges />
      <meshBasicMaterial color='grey' />
    </mesh>
  </RigidBody>
)

export default Ground