import {Interactive} from '@react-three/xr'
import {useState} from 'react'
import {RigidBody} from '@react-three/rapier'
import {Edges} from '@react-three/drei'

const Cube = ({type, action, pos, size, noHover, color, hoverColor}) => {

  const [isHover, setIsHover] = useState(false)

  return (
    <Interactive
      onHover={type ? () => setIsHover(true) : null}
      onBlur={type ? () => setIsHover(false) : null}
    >
      <RigidBody type={type}>
        <mesh
          position={pos}
          onClick={action}
          onPointerOver={!noHover ? () => setIsHover(true) : null}
          onPointerOut={!noHover ? () => setIsHover(false) : null}
        >
          <boxGeometry args={size || [1, 1, 1]} />
          <Edges />
          <meshBasicMaterial
            color={isHover ? hoverColor || '#FFF' : color || '#00F'}
          />
        </mesh>
      </RigidBody>
    </Interactive>
  )
}

export default Cube