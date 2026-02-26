

import React, { useMemo, useState } from 'react'
import * as THREE from 'three'
import { a } from '@react-spring/three'
import { MeshDistortMaterial } from '@react-three/drei'


const AnimatedMaterial = a(MeshDistortMaterial)

export default function Sculpture({
  group,
  scale = 1,
  color,
  coat = 1,
  env = 1,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onPointerUp,
}) {

  // Materials (memoized)
  const materials = useMemo(
    () => ({
      cup: new THREE.MeshStandardMaterial({ color: '#ffefef' }),
    }),
    []
  )

  // Collect meshes once
  const meshes = useMemo(() => {
    const collected = []
    // console.log(group)
    group.traverse((child) => {
      if (child.isMesh) {
        collected.push(child)
        // child.castShadow = true;
        // child.receiveShadow = true;
      }
    })
    return collected
  }, [group])



const getMaterial = (mesh) => {
  const mat = materials.cup.clone()
  if (color) mat.color = new THREE.Color(color.get ? color.get() : color)
  return mat
}

  return (
    <a.group
        // position={group.position}
        // move position -1 in y axis to center
        position={[group.position.x, group.position.y - 1, group.position.z]}

        rotation={group.rotation}
        scale={.3} // passed from Scene
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        >
      {meshes.map((mesh) => (
        <mesh
          key={mesh.uuid}
          geometry={mesh.geometry}
          castShadow
          receiveShadow
        >
          <AnimatedMaterial
            color={color}
            envMapIntensity={env}
            clearcoat={coat}
            clearcoatRoughness={0}
            metalness={0.1}
            distort={0.1}
          />
        </mesh>
      ))}
    </a.group>
   
  )
}
