import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useGLTF,
} from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { useSpring as useSpring3, a } from '@react-spring/three'
import Torus from '../Models/Torus'
import Model from '../Models/Model'
import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'

import { projects } from '../Projects'

const modelMap = new Map(Object.entries(projects))

// Animates a model group to [0, 0.15, 0] when clicked, springs back on deselect
function AnimatedModel({
  child,
  x,
  z,
  isClicked,
  visible,
  onPointerDown,
  onPointerUp,
  interactive,
}) {
  const [spring, api] = useSpring3(() => ({
    position: [x, 0.15, z],
    config: { mass: 1, tension: 170, friction: 26 },
  }))

  // useEffect(() => {
  //   api.start({
  //     position: isClicked ? [0, 0.225, 0] : [x, 0.15, z],
  //   })
  // }, [isClicked, x, z, api])

  // useEffect(() => {
  //   if (isClicked) {
  //     api.start({
  //       position: [0, 0.275, 0],
  //     })
  //   } else {
  //     api.set({ position: [x, 0.15, z] }) // ← instant snap, no animation
  //   }
  // }, [isClicked, x, z, api])

  useEffect(() => {
    if (isClicked) {
      api.set({ position: [0, 0.225, 0] }) // instant snap
    } else {
      api.set({ position: [x, 0.15, z] }) // instant snap
    }
  }, [isClicked, x, z, api])

  return (
    <a.group position={spring.position} visible={visible}>
      <Model
        group={child}
        color={isClicked ? '#E8B059' : '#f5f5f0'}
        onPointerDown={interactive ? onPointerDown : undefined}
        onPointerUp={interactive ? onPointerUp : undefined}
      />
    </a.group>
  )
}

export default function WorkScene({
  setBg,
  selectedJob,
  onModelHover,
  onResetRef,
}) {
  const light = useRef()
  const cam = useRef()
  const orbitRef = useRef()
  const initialized = useRef(false)
  const hasMoved = useRef(false)
  const lerpProgress = useRef(0)

  const [mode, setMode] = useState(false)
  const [down, setDown] = useState(false)
  const [clickedIndex, setClickedIndex] = useState(null)

  const { scene } = useGLTF('/GLTFs/Models.glb')
  const torus = scene.getObjectByName('Torus')
  const modelGroup = scene.getObjectByName('Models')
  const allModels = modelGroup ? modelGroup.children : []

  console.log('GLTF loaded:', allModels)

  const radius = 0.66

  const filteredModels = useMemo(() => {
    if (!selectedJob) return allModels
    return allModels.filter((child) => {
      const meta = modelMap.get(child.name)
      return meta && meta.company === selectedJob
    })
  }, [allModels, selectedJob])

  console.log(
    'Filtered models:',
    filteredModels.map((m) => m.name),
  )

  // FIX: compute positions inside useMemo so they're stable and never accumulate
  const modelPositions = useMemo(() => {
    return filteredModels.map((child, i) => {
      const angle = (i / filteredModels.length) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const delta = 0.2
      const modelCamPosX = Math.cos(angle) * (radius + delta)
      const modelCamPosZ = Math.sin(angle) * (radius + delta)
      return { name: child.name, x, z, modelCamPosX, modelCamPosZ }
    })
  }, [filteredModels])

  // Camera lerp target ref — set this when a click happens, useFrame smoothly moves toward it
  const camTarget = useRef({ x: 4.1, y: 0.4, z: -1.2 })

  // const resetCamera = () => {
  //   console.log('Resetting camera to default position')
  //   camTarget.current = { x: 4.1, y: 0.4, z: -1.2 }
  //   lerpProgress.current = 0
  //   if (orbitRef.current) {
  //     orbitRef.current.target.set(0, -0.7, 0)
  //     orbitRef.current.update()
  //   }
  // }
  const resetCamera = () => {
    if (cam.current) {
      cam.current.position.set(4.1, 0.4, -1.2)
      cam.current.fov = 35
      cam.current.updateProjectionMatrix()
      cam.current.lookAt(0, -0.8, 0)
    }
    if (orbitRef.current) {
      orbitRef.current.target.set(0, -0.7, 0)
      orbitRef.current.update()
    }
  }

  useEffect(() => {
    if (onResetRef) {
      onResetRef.current = () => {
        setClickedIndex(null)
        if (onModelHover) onModelHover(null)
        resetCamera()
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // FIX: renamed from onModelHover → handleModelSelect to match actual click behaviour
  const handleModelSelect = (meta) => {
    console.log('Model selected:', meta)
    if (onModelHover) onModelHover(meta)
    if (meta === null) {
      setClickedIndex(null)
      resetCamera()
    }
  }

  // Reset when filter changes
  useEffect(() => {
    setClickedIndex(null)
    if (onModelHover) onModelHover(null)
    resetCamera()
  }, [selectedJob]) // eslint-disable-line react-hooks/exhaustive-deps
  // note: onModelHover intentionally omitted — callers should memoize it or
  // wrap in useCallback to avoid stale-closure issues

  useEffect(() => {
    hasMoved.current = false
    lerpProgress.current = 0
  }, [clickedIndex])

  useFrame((state, delta) => {
    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20

    // // One-time initialisation lookAt
    // if (!initialized.current && cam.current) {
    //   cam.current.lookAt(0, -0.8, 0)
    //   cam.current.updateMatrixWorld()
    //   initialized.current = true
    // }

    // // FIX: smooth lerp camera to target instead of instant snap
    // if (clickedIndex !== null && !hasMoved.current) {
    //   const modelPos = modelPositions.find(
    //     (m) => m.name === filteredModels[clickedIndex]?.name,
    //   )
    //   if (modelPos) {
    //     camTarget.current = {
    //       x: modelPos.modelCamPosX,
    //       y: -0.42,
    //       z: modelPos.modelCamPosZ,
    //     }
    //     hasMoved.current = true
    //     lerpProgress.current = 0
    //   }
    // }

    // if (cam.current && lerpProgress.current < 1) {
    //   lerpProgress.current = Math.min(lerpProgress.current + delta * 2, 1)
    //   const t = lerpProgress.current
    //   cam.current.position.x +=
    //     (camTarget.current.x - cam.current.position.x) * t
    //   cam.current.position.y +=
    //     (camTarget.current.y - cam.current.position.y) * t
    //   cam.current.position.z +=
    //     (camTarget.current.z - cam.current.position.z) * t
    //   cam.current.lookAt(0, -0.8, 0)
    //   cam.current.updateMatrixWorld()
    // }

    // if (cam.current) {
    //   const targetFov = clickedIndex !== null ? 15 : 35 // lower = more zoomed
    //   cam.current.fov += (targetFov - cam.current.fov) * delta * 2
    //   cam.current.updateProjectionMatrix()
    // }
  })

  const [{ ambient, env }] = useSpring(
    {
      ambient: mode ? 1.5 : 0.5,
      env: mode ? 0.4 : 1,
    },
    [mode],
  )

  // True when no model is selected — all interactions are locked while one is active
  const sceneInteractive = clickedIndex === null

  return (
    <>
      <PerspectiveCamera
        ref={cam}
        makeDefault
        position={[4.1, 0.4, -1.2]}
        fov={35}
      />

      <OrbitControls
        ref={orbitRef}
        makeDefault
        target={[0, -0.7, 0]}
        position0={[4.1, 0.4, -1.2]}
        enableZoom={false}
        enablePan={false}
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
          visible={sceneInteractive}
          onPointerDown={sceneInteractive ? () => setDown(true) : undefined}
          onPointerUp={
            sceneInteractive
              ? () => {
                  setDown(false)
                  setMode(!mode)
                  setBg({
                    background: !mode ? '#202020' : '#f0f0f0',
                    fill: !mode ? '#f0f0f0' : '#202020',
                  })
                }
              : undefined
          }
        />

        {filteredModels.map((child, i) => {
          const pos = modelPositions[i]
          const { x, z } = pos
          const isClicked = clickedIndex === i
          const meta = modelMap.get(child.name)

          // Keep position on modelMap for hover card consumption
          if (meta) {
            modelMap.set(child.name, { ...meta, position: { x, z } })
          }

          return (
            <AnimatedModel
              key={child.uuid}
              child={child}
              x={x}
              z={z}
              isClicked={isClicked}
              visible={sceneInteractive || isClicked}
              interactive={sceneInteractive}
              onPointerDown={() => {
                console.log('Model pointer down:', child.name)
                setDown(true)
              }}
              // onPointerUp={() => {
              //   console.log('Model clicked:', child.name)
              //   setDown(false)
              //   if (clickedIndex === i) {
              //     // Deselect — spring back to original position
              //     // setClickedIndex(null)
              //     // handleModelSelect(null)
              //   } else {
              //     // Select — spring to center [0, 0.15, 0]
              //     setClickedIndex(i)
              //     if (onModelHover) onModelHover(meta || null)
              //     if (orbitRef.current) orbitRef.current.update()
              //   }
              // }}
              onPointerUp={() => {
                setDown(false)
                setClickedIndex(i)
                if (onModelHover) onModelHover(meta || null)
                if (cam.current) {
                  const pos = modelPositions[i]
                  cam.current.position.set(
                    pos.modelCamPosX,
                    -0.42,
                    pos.modelCamPosZ,
                  )
                  cam.current.fov = 15
                  cam.current.updateProjectionMatrix()
                  cam.current.lookAt(0, -0.8, 0)
                }
                if (orbitRef.current) orbitRef.current.update()
              }}
            />
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

useGLTF.preload('/GLTFs/Models.glb')
