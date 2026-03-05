import React, { useRef, Suspense, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useGLTF,
  Html,
  Float,
  PresentationControls,
} from '@react-three/drei'

// import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react'

import { useControls } from 'leva'

// ── Laptop ────────────────────────────────────────────────────────────────────
// function Laptop({ screenUrl = 'https://bruno-simon.com/html/' }) {

// function Laptop({ screenUrl = './pictures/data_viz.gif' }) {

function Laptop({ screenUrl = './pictures/data_viz.gif' }) {
  const laptop = useGLTF('/GLTFs/Laptop.glb')

  // const screenControls = useControls('Laptop Screen', {
  //   distanceFactor: {
  //     value: 1.3,
  //     min: 0.1,
  //     max: 2,
  //     step: 0.01,
  //   },
  //   rotationX: {
  //     value: -0.18,
  //     min: -Math.PI,
  //     max: Math.PI,
  //     step: 0.01,
  //   },
  //   positionX: {
  //     value: -0.24,
  //     min: -5,
  //     max: 5,
  //     step: 0.01,
  //   },
  //   positionY: {
  //     value: 1.17,
  //     min: -5,
  //     max: 5,
  //     step: 0.01,
  //   },
  //   positionZ: {
  //     value: -1.1,
  //     min: -5,
  //     max: 5,
  //     step: 0.01,
  //   },
  // })

  return (
    <PresentationControls
      global={false}
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      damping={0.1}
      snap
    >
      <Float rotationIntensity={0.3}>
        <rectAreaLight
          width={2.5}
          height={1.65}
          intensity={40}
          color="#ffe0a0"
          rotation={[-0.1, Math.PI, 0]}
          position={[0, 0.55, -1.15]}
        />

        <primitive object={laptop.scene} position-y={-1.2}>
          <Html
            transform
            wrapperClass="laptopScreen"
            distanceFactor={1.3}
            position={[-0.24, 1.17, -1.1]}
            rotation-x={-0.18}
            style={{ width: '1024px', height: '670px', overflow: 'hidden' }}
          >
            <img
              src={screenUrl}
              alt="expertise"
              style={{
                width: '1024px',
                height: '670px',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </Html>
        </primitive>
      </Float>
    </PresentationControls>
  )
}

useGLTF.preload('/GLTFs/Laptop.glb')

const EXPERTISE_URLS = {
  structural: './pictures/structural.png',
  parametric: './pictures/parametric.gif',
  data_visualization: './pictures/data_visualization.gif',
  coding: './pictures/coding.png',
  // ...add your expertise IDs and their corresponding URLs
}

const DEFAULT_URL = './pictures/structural.png'

// ── Scene ─────────────────────────────────────────────────────────────────────
export default function ExpertiseScene({ laptopUrl, selectedExpertise }) {
  const screenUrl =
    EXPERTISE_URLS[selectedExpertise] ?? laptopUrl ?? DEFAULT_URL
  // export default function ExpertiseScene({ laptopUrl }) {
  const light = useRef()

  const cam = useRef()

  // const controls = useControls({
  //   positionX: {
  //     value: 14,
  //     min: -10,
  //     max: 20,
  //     step: 0.1,
  //   },
  //   positionY: {
  //     value: 0.3,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },
  //   positionZ: {
  //     value: 13.5,
  //     min: -25,
  //     max: 25,
  //     step: 0.1,
  //   },
  //   fov: {
  //     value: 20,
  //     min: 0,
  //     max: 100,
  //     step: 5,
  //   },
  //   lookAtX: {
  //     value: 0,
  //     min: -5,
  //     max: 5,
  //     step: 0.1,
  //   },
  //   lookAtY: {
  //     value: -0.5,
  //     min: -1,
  //     max: 1,
  //     step: 0.1,
  //   },
  //   lookAtZ: {
  //     value: -0.4,
  //     min: -1,
  //     max: 1,
  //     step: 0.1,
  //   },
  // })

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20
  })

  // Set initial position/lookAt once on mount only
  // useEffect(() => {
  //   if (cam.current) {
  //     cam.current.position.set(
  //       // controls.positionX,
  //       // controls.positionY,
  //       // controls.positionZ,
  //       14,
  //       0.3,
  //       13.5,
  //     )
  //     // cam.current.lookAt(controls.lookAtX, controls.lookAtY, controls.lookAtZ)
  //     cam.current.lookAt(0, -0.5, -0.4)

  //     cam.current.updateMatrixWorld()
  //   }
  // }, []) // empty deps = runs once

  // useFrame((state) => {
  //   // light.current.position.x = state.mouse.x * 20
  //   // light.current.position.y = state.mouse.y * 20

  //   // if (cam.current) {
  //   //   // cam.current.lookAt(controls.lookAtX, controls.lookAtY, controls.lookAtZ)
  //   //   // cam.current.updateMatrixWorld()
  //   //   // initialized.current = true
  //   // }
  //   // if (cam.current) {
  //   //   cam.current.position.set(
  //   //     controls.positionX,
  //   //     controls.positionY,
  //   //     controls.positionZ,
  //   //   )
  //   //   cam.current.lookAt(controls.lookAtX, controls.lookAtY, controls.lookAtZ)
  //   //   cam.current.updateProjectionMatrix()
  //   // }

  //   if (cam.current) {
  //     cam.current.position.set(14, 0.3, 13.5)
  //     // cam.current.lookAt(controls.lookAtX, controls.lookAtY, controls.lookAtZ)
  //     cam.current.lookAt(0, -0.5, -0.4)
  //     cam.current.updateProjectionMatrix()
  //   }
  // })

  return (
    <>
      {/* <PerspectiveCamera makeDefault position={[14, 0.3, 13.4]} fov={20} /> */}

      <PerspectiveCamera
        makeDefault
        position={[14, 0.3, 13.5]}
        fov={20}
        onUpdate={(cam) => cam.lookAt(0, -0.5, -0.4)}
      />

      {/* <PerspectiveCamera ref={cam} makeDefault fov={controls.fov} /> */}

      {/* <PerspectiveCamera
        position={[controls.positionX, controls.positionY, controls.positionZ]}
        makeDefault
        fov={controls.fov}
      /> */}

      {/* <PerspectiveCamera ref={cam} makeDefault fov={controls.fov} /> */}

      <ambientLight intensity={0.5} />
      <pointLight ref={light} position-z={-15} intensity={1} color="#F8C069" />

      <Suspense fallback={null}>
        <Laptop screenUrl={screenUrl} key={screenUrl} />

        <Environment preset="warehouse" />
        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
      </Suspense>
    </>
  )
}
