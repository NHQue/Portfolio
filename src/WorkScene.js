import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useGLTF,
} from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import Torus from './Torus'
import Model from './Model'
import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'

import { useImperativeHandle, forwardRef } from 'react'

const modelMap = new Map([
  [
    'Busbetriebshof',
    {
      name: 'Busbetriebshof',
      company: 'WS',
      year: 2017,
      material: 'Concrete',
      typology: 'Infrastructure',
    },
  ],
  [
    'KIA',
    {
      name: 'KIA',
      company: 'WS',
      year: 2017,
      material: 'Concrete',
      typology: 'Infrastructure',
    },
  ],
  [
    'OneRoof',
    {
      name: 'OneRoof',
      company: 'WS',
      year: 2018,
      material: 'Concrete',
      typology: 'Office',
    },
  ],
  [
    'RB_Leipzig',
    {
      name: 'RB_Leipzig',
      company: 'BG',
      year: 2022,
      material: 'Timber',
      typology: 'Office',
    },
  ],
  [
    'Hellerhöfe',
    {
      name: 'Hellerhöfe',
      company: 'BG',
      year: 2022,
      material: 'Timber',
      typology: 'Residential',
    },
  ],
  [
    'KITA_Mattenberg',
    {
      name: 'KITA_Mattenberg',
      company: 'BG',
      year: 2022,
      material: 'Timber',
      typology: 'Educational',
    },
  ],
  [
    'Sportpark',
    {
      name: 'Sportpark',
      company: 'TR',
      year: 2020,
      material: 'Steel',
      typology: 'Sports Facility',
    },
  ],
  [
    'Bienen',
    {
      name: 'Bienen',
      company: 'TR',
      year: 2020,
      material: 'Timber',
      typology: 'Educational',
    },
  ],
  [
    'AlterHafen',
    {
      name: 'AlterHafen',
      company: 'TR',
      year: 2024,
      material: 'Timber',
      typology: 'Office',
    },
  ],
  [
    'Löwensaal',
    {
      name: 'Löwensaal',
      company: 'TR',
      year: 2024,
      material: 'Timber',
      typology: 'Event Hall',
    },
  ],
  [
    'NHR',
    {
      name: 'NHR',
      company: 'TR',
      year: 2025,
      material: 'Steel',
      typology: 'Educational',
    },
  ],
  [
    'StegÜberVorflut',
    {
      name: 'StegÜberVorflut',
      company: 'TR',
      year: 2025,
      material: 'Steel',
      typology: 'Bridge',
    },
  ],
  [
    'Wärmespeicher',
    {
      name: 'Wärmespeicher',
      company: 'TR',
      year: 2025,
      material: 'Steel',
      typology: 'Infrastructure',
    },
  ],
  [
    'Seabridge',
    {
      name: 'Seabridge',
      company: 'TR',
      year: 2025,
      material: 'Concrete',
      typology: 'Bridge',
    },
  ],
  [
    'ProArbeit',
    {
      name: 'ProArbeit',
      company: 'TR',
      year: 2026,
      material: 'Timber',
      typology: 'Office',
    },
  ],
])

const modelPositions = []

export default function WorkScene({ setBg, selectedJob, onModelHover }) {
  const light = useRef()
  const cam = useRef()
  const [mode, setMode] = useState(false)
  const [down, setDown] = useState(false)
  const [clickedIndex, setClickedIndex] = useState(null)

  const controls = useControls({
    positionX: {
      value: 4.1,
      min: -25,
      max: 25,
      step: 0.1,
    },
    positionY: {
      value: 0.4,
      min: -25,
      max: 25,
      step: 0.1,
    },
    positionZ: {
      value: -1.2,
      min: -25,
      max: 25,
      step: 0.1,
    },
    fov: {
      value: 35,
      min: 0,
      max: 100,
      step: 5,
    },
    lookAtX: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.1,
    },
    lookAtY: {
      value: -0.7,
      min: -1,
      max: 1,
      step: 0.1,
    },
    lookAtZ: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.1,
    },
  })

  const { scene } = useGLTF('/GLTFs/Models.glb')
  const torus = scene.getObjectByName('Torus')
  const modelGroup = scene.getObjectByName('Models')
  const allModels = modelGroup ? modelGroup.children : []

  const orbitRef = useRef()

  // 2. Update handleModelHover to reset camera + orbit target
  const handleModelHover = (meta) => {
    if (onModelHover) onModelHover(meta)
    if (meta === null) {
      setClickedIndex(null)
      // Reset camera and orbit controls to initial values
      if (cam.current && orbitRef.current) {
        cam.current.position.set(4.1, 0.4, -1.2)
        orbitRef.current.target.set(0, -0.7, 0)
        orbitRef.current.update()
      }
    }
  }

  // console.log('Loaded models:', allModels) // Log loaded model names

  const filteredModels = useMemo(() => {
    if (!selectedJob) return allModels
    return allModels.filter((child) => {
      const meta = modelMap.get(child.name)
      return meta && meta.company === selectedJob
    })
  }, [allModels, selectedJob])

  // Reset clicked model when job filter changes
  useEffect(() => {
    setClickedIndex(null)
    if (onModelHover) onModelHover(null)
  }, [selectedJob])

  // Set initial position/lookAt once on mount only
  useEffect(() => {
    if (cam.current) {
      // cam.current.position.set(controls.positionX, controls.positionY, controls.positionZ)
      // cam.current.lookAt(controls.lookAtX, controls.lookAtY, controls.lookAtZ)
      // cam.current.updateMatrixWorld()
    }
  }, []) // empty deps = runs once

  useEffect(() => {
    hasMoved.current = false
  }, [clickedIndex])

  const initialized = useRef(false)

  const hasMoved = useRef(false)

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20

    if (!initialized.current && cam.current) {
      cam.current.lookAt(0, -0.8, 0)
      cam.current.updateMatrixWorld()
      initialized.current = true
    }

    // console.log('Camera position:', cam.current.position)

    if (clickedIndex !== null && !hasMoved.current) {
      const modelPos = modelPositions.find(
        (m) => m.name === filteredModels[clickedIndex].name,
      )?.position
      if (modelPos && cam.current) {
        cam.current.position.set(
          modelPos.modelCamPosX,
          -0.82,
          modelPos.modelCamPosZ,
        )
        cam.current.lookAt(0, -0.8, 0)
        cam.current.updateMatrixWorld()
        hasMoved.current = true // ✅ now actually persists
      }
    }
  })

  const [{ ambient, env }] = useSpring(
    {
      ambient: mode ? 1.5 : 0.5,
      env: mode ? 0.4 : 1,
    },
    [mode],
  )

  const radius = 0.66

  return (
    <>
      <PerspectiveCamera
        ref={cam}
        makeDefault
        position={[4.1, 0.4, -1.2]} // hardcode your tweaked initial values
        fov={35}
      />

      {/* <OrbitControls
        makeDefault
        target={[0, -0.7, 0]}
        position0={[4.1, 0.4, -1.2]}
      /> */}

      <OrbitControls
        ref={orbitRef}
        makeDefault
        target={[0, -0.7, 0]}
        position0={[4.1, 0.4, -1.2]}
      />

      <a.ambientLight intensity={ambient} />
      <a.pointLight
        ref={light}
        position-z={-15}
        intensity={env}
        color="#F8C069"
      />

      <Suspense fallback={null}>
        <Torus
          group={torus}
          visible={clickedIndex === null} // ← add this
          onPointerDown={() => setDown(true)}
          onPointerUp={() => {
            setDown(false)
            setMode(!mode)
            setBg({
              background: !mode ? '#202020' : '#f0f0f0',
              fill: !mode ? '#f0f0f0' : '#202020',
            })
          }}
        />

        {filteredModels.map((child, i) => {
          const angle = (i / filteredModels.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const isClicked = clickedIndex === i
          const meta = modelMap.get(child.name)

          // set a position to the modelMap for the hover card to use
          if (meta) {
            modelMap.set(child.name, { ...meta, position: { x, z } })
          }

          const delta = 0.4
          const modelCamPosX = Math.cos(angle) * (radius + delta)
          const modelCamPosZ = Math.sin(angle) * (radius + delta)

          modelPositions.push({
            name: child.name,
            position: { modelCamPosX, modelCamPosZ },
          })

          return (
            // <group key={child.uuid} position={[x, 0.15, z]}>
            <group
              key={child.uuid}
              position={[x, 0.15, z]}
              visible={clickedIndex === null || clickedIndex === i} // ← add this
            >
              <Model
                group={child}
                color={isClicked ? '#E8B059' : '#f5f5f0'}
                onPointerDown={() => setDown(true)}
                onPointerUp={() => {
                  setDown(false)
                  // clicking same model resets, clicking new one shows its card
                  if (clickedIndex === i) {
                    setClickedIndex(null)
                    if (onModelHover) onModelHover(null)
                  } else {
                    setClickedIndex(i)
                    if (onModelHover) onModelHover(meta || null)
                  }
                }}
              />
            </group>
          )
        })}

        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -0.99, 0]}
          opacity={mode ? 0.8 : 0.4}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  )
}
