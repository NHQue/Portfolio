import React, { useMemo } from 'react'
import * as THREE from 'three'
import { a } from '@react-spring/three'

export default function Model({ group, color, onPointerDown, onPointerUp }) {
  const { concreteMeshes, steelMeshes, timberMeshes, allMeshes } =
    useMemo(() => {
      const concreteMeshes = []
      const steelMeshes = []
      const timberMeshes = []
      const allMeshes = []

      group.traverse((child) => {
        if (!child.isMesh) return
        allMeshes.push(child)

        // Walk up to find the highest parent still within the group
        let top = child
        while (top.parent && top.parent !== group) {
          top = top.parent
        }
        const topName = top.name.toLowerCase()

        if (topName.includes('concrete')) concreteMeshes.push(child)
        else if (topName.includes('steel')) steelMeshes.push(child)
        else if (topName.includes('timber')) timberMeshes.push(child)
      })

      return { concreteMeshes, steelMeshes, timberMeshes, allMeshes }
    }, [group])

  const { bboxSize, bboxCenter } = useMemo(() => {
    const box = new THREE.Box3()
    allMeshes.forEach((mesh) => box.union(new THREE.Box3().setFromObject(mesh)))
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    return { bboxSize: size, bboxCenter: center }
  }, [allMeshes])

  return (
    <a.group
      position={[group.position.x, group.position.y - 1, group.position.z]}
      rotation={group.rotation}
      scale={0.3}
    >
      {concreteMeshes.map((mesh) => (
        <mesh key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
          <a.meshStandardMaterial
            color="#adadac"
            roughness={0.6}
            metalness={0.05}
          />
          {/* <meshPhysicalMaterial
            color="#c8c4be"
            roughness={0.85}
            metalness={0.0}
            clearcoat={0.1}
            clearcoatRoughness={0.4}
          /> */}
        </mesh>
      ))}

      {steelMeshes.map((mesh) => (
        <mesh key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
          <a.meshStandardMaterial
            color="#0609ca"
            roughness={0.4}
            metalness={0.8}
          />
          {/* <meshPhysicalMaterial
            color="#8a9bb0"
            roughness={0.15}
            metalness={0.95}
            reflectivity={1}
            envMapIntensity={1.5}
          /> */}
        </mesh>
      ))}

      {timberMeshes.map((mesh) => (
        <mesh key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
          <a.meshStandardMaterial
            color="#e9cc95"
            roughness={0.7}
            metalness={0.0}
          />
          {/* <meshPhysicalMaterial
            color="#c4965a"
            roughness={0.75}
            metalness={0.0}
            sheen={0.3}
            sheenColor="#a0622a"
          /> */}
        </mesh>
      ))}

      {/* Invisible bounding box — captures clicks */}
      <mesh
        position={[bboxCenter.x, bboxCenter.y, bboxCenter.z]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <boxGeometry args={[bboxSize.x, bboxSize.y, bboxSize.z]} />
        <meshBasicMaterial color="#E8B059" wireframe />
      </mesh>
    </a.group>
  )
}
