import {Canvas} from '@react-three/fiber'
import {XR} from '@react-three/xr'
import {Physics} from '@react-three/rapier'
import {useEffect, useState, useRef} from 'react'
import {OrbitControls, Text} from '@react-three/drei'
import {Fragment} from 'react'

import './App.css'
import Cube from './components/Cube/Cube'
import Ground from './components/Ground/Ground'

const tableCubes = [
  {pos: [-1, 0, 0], type: 'leg'},
  {pos: [-1, 0, 3], type: 'leg'},
  {pos: [3, 0, 3], type: 'leg'},
  {pos: [3, 0, 0], type: 'leg'},
  {pos: [1, 4, 0.5], type: 'top'}
]

const defaultDemoCubePos = [1, 12, 1]

const App = () => {

  const [isTable, setIsTable] = useState(true)
  const [gravity, setGravity] = useState(1)
  const [mustReload, setMustReload] = useState(false)
  const [actionText, setActionText] = useState({text: '', color: undefined})

  const timeOutRef = useRef(null)

  const cubeBtns = [
    {label: 'Custom', gravity: 5},
    {label: 'Pluto', gravity: .071},
    {label: 'Venus', gravity: .907},
    {label: 'Earth', gravity: 1},
    {label: 'Moon', gravity: .166},
    {label: 'Mars', gravity: .377},
    {label: 'Jupiter', gravity: 2.36},
    {
      label: 'Show table',
      action: () => setIsTable((old) => !old)
    }
  ]

  useEffect(() => {
    if (actionText?.text !== '') {
      timeOutRef.current = setTimeout(() => {setActionText('')}, 2000)
    }
    return () => clearTimeout(timeOutRef?.current)
  }, [actionText])

  useEffect(() => {handleChangeGravity(gravity)}, [isTable])

  const TitleCaption = () => (
    <Text
      position={[-8.5, 0, -9]}
      rotation={[-45, 0, 0]}
      lineHeight={0.8}
      fontSize={2}
      material-toneMapped={false}
      anchorX='right'
    >
      {'GRAVITY GAME'}
    </Text>
  )

  const ActionCaption = ({children}) => (
    <Text
      position={[10, 10, -20]}
      lineHeight={0.8}
      color={actionText?.color}
      fontSize={3}
      material-toneMapped={false}
    >
      {children}
    </Text>
  )

  const handleChangeGravity = (newGravity) => {
    setGravity(newGravity)
    setMustReload(true)
    setTimeout(() => {setMustReload(false)}, 100)
  }

  return (
    <div id='app-container'>
      <Canvas camera={{position: [-3, 15, 15]}}>
        <XR>
          <OrbitControls autoRotate={false} />
          <Physics gravity={[0, -gravity * 10, 0]}>
            <Ground />
            {
              actionText?.text !== '' &&
              <ActionCaption>{actionText?.text}</ActionCaption>
            }
            <TitleCaption />
            {cubeBtns?.map((elem, i) => (
              <Fragment key={i}>
                <Text
                  position={[-10.5, 0, 2.5 * i - 5]}
                  rotation={[-45, 0, 0]}
                  lineHeight={0.8}
                  fontSize={0.75}
                  material-toneMapped={false}
                  anchorX='right'
                >
                  {elem?.label}
                </Text>
                <Cube
                  type='fixed'
                  size={[1, 1, 1]}
                  pos={[-9, 0, 2.5 * i - 5]}
                  color={
                    elem?.gravity === undefined ? isTable ? 'lime' : ''
                    :
                    gravity === elem?.gravity ? '#0F0' : '#00F'
                  }
                  action={
                    elem?.action
                    ?
                    elem?.action
                    :
                    () => handleChangeGravity(elem?.gravity)
                  }
                />
              </Fragment>
            ))}
            {
              !mustReload &&
              <>
                {
                  isTable &&
                  tableCubes?.map((elem, i) => (
                    <Cube
                      key={i}
                      pos={elem?.pos}
                      size={elem?.type === 'leg' ? [0.5, 4, 0.5] : [5, 0.5, 5]}
                      color='brown'
                      noHover
                    />
                  ))
                }
                <Cube
                  pos={[...defaultDemoCubePos]}
                  size={[6, 2, 6]}
                  color='crimson'
                  noHover
                />
              </>
            }
          </Physics>
        </XR>
      </Canvas>
    </div>
  )
}

export default App
