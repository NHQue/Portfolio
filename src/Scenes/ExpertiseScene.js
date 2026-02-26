import React, { useRef, Suspense } from 'react'
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

// ── Laptop ────────────────────────────────────────────────────────────────────
function Laptop({ screenUrl = 'https://bruno-simon.com/html/' }) {
  const laptop = useGLTF('/GLTFs/Laptop.glb')

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
            distanceFactor={1.17}
            position={[0, 1.56, -1.4]}
            rotation-x={-0.256}
          >
            <iframe
              src={screenUrl}
              title="Laptop screen"
              style={{ border: 'none', borderRadius: 0 }}
            />
          </Html>
        </primitive>
      </Float>
    </PresentationControls>
  )
}

useGLTF.preload('/GLTFs/Laptop.glb')

// ── Scene ─────────────────────────────────────────────────────────────────────
export default function ExpertiseScene({ laptopUrl }) {
  const light = useRef()

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 10, 14]} fov={120} />

      <ambientLight intensity={0.5} />
      <pointLight ref={light} position-z={-15} intensity={1} color="#F8C069" />

      <Suspense fallback={null}>
        <Laptop screenUrl={laptopUrl} />

        <Environment preset="warehouse" />
        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
      </Suspense>
    </>
  )
}
