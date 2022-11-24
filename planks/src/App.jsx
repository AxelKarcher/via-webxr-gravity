import {Canvas} from '@react-three/fiber'
import {XR, Controllers, VRButton} from '@react-three/xr'
import {Physics} from '@react-three/rapier'
import {useEffect, useState, useRef} from 'react'
import {Cloud, OrbitControls, Text} from '@react-three/drei'

import './App.css'
import Cube from './components/Cube/Cube'
import Ground from './components/Ground/Ground'

const App = () => {

  const cubeBtns = [
    {
      pos: [-11, 0, 9],
      color: '#0F0',
      hoverColor: '#44FF44',
      action: () => addPlank()
    },
    {
      pos: [-11, 0, 6],
      color: '#00F',
      hoverColor: '#4444FF',
      action: () => addPlank('tower')
    },
    {
      pos: [-11, 0, 3],
      color: '#F00',
      hoverColor: '#FF4444',
      action: () => handleDeleteAll()
    }
  ]

  const [planks, setPlanks] = useState([])
  const [nextTowerColor, setNextTowerColor] = useState('#00F')
  const [actionText, setActionText] = useState({text: '', color: undefined})

  const timeOutRef = useRef(null)

  useEffect(() => {
    if (actionText?.text !== '') {
      timeOutRef.current = setTimeout(() => {setActionText('')}, 2000)
    }
    return () => clearTimeout(timeOutRef?.current)
  }, [actionText])

  const addPlank = (tag) => {
    let newPlanks = [...planks]

    newPlanks.push({
      pos: [tag ? 0 : getRandom(-8, 10), tag ? 15 : 1, tag ? 0 : getRandom(-7, 9)],
      size: [getRandom(1, 4), 0.5, getRandom(1, 4)],
      color: nextTowerColor
    })
    if (tag) {
      setNextTowerColor((old) => old === '#00F' ? '#44F' : '#00F')
      setActionText({text: 'NEW TOWER PLANK', color: 'blue'})
    } else {
      setActionText({text: 'NEW RANDOM BLOCK', color: 'green'})
    }
    setPlanks(newPlanks)
  }

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const deletePlank = (index) => {
    setActionText({text: 'PLANK DELETED', color: 'red'})
    setPlanks((old) => old?.filter((_elem, i) => {
      return i !== index
    }))
  }

  const handleDeleteAll = () => {
    setPlanks([])
    setActionText({text: 'DELETE EVERYTHING', color: 'red'})
  }

  const TitleCaption = ({children}) => {
    return (
      <Text
        position={[0, 5, -20]}
        lineHeight={0.8}
        fontSize={5}
        material-toneMapped={false}
      >
        {children}
      </Text>
    )
  }

  const ActionCaption = ({children}) => {
    return (
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
  }

  return (
    <div id='app-container'>
      <Canvas camera={{position: [-8, 13, 17]}} shadows>
        <XR>
          <OrbitControls autoRotate={false} />
          <Cloud
            opacity={0.75}
            speed={1.5}
            width={50}
            depth={5}
            segments={15}
          />
          <Controllers />
          <Physics gravity={[0, -1, 0]}>
            <ambientLight />
            <spotLight position={[10, 10, 10]} />
            <Ground />
            <TitleCaption>{'THE\nSKYSCRAPER\nBUILDER'}</TitleCaption>
              {
                actionText?.text !== '' &&
                <ActionCaption>{actionText?.text}</ActionCaption>
              }
            {cubeBtns?.map((elem, i) => (
              <Cube
                key={i}
                type='fixed'
                size={[2, 1, 2]}
                pos={elem?.pos}
                color={elem?.color}
                hoverColor={elem?.hoverColor}
                action={elem?.action}
              />
            ))}
            {planks?.map((elem, i) => (
              <Cube
                key={i}
                pos={elem?.pos}
                size={elem?.size}
                action={() => deletePlank(i)}
                color={elem?.color}
                hoverColor='#4444FF'
              />
            ))}
          </Physics>
        </XR>
      </Canvas>
      <VRButton />
    </div>
  )
}

export default App
