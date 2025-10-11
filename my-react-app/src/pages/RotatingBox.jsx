// src/components/RotatingBox.jsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei' // Optional for simple animation

function Box(props) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.5 
        meshRef.current.rotation.y += delta * 0.3
    }
  })
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#4f46e5'} wireframe={false} />
    </mesh>
  )
}

export default function RotatingBox() {
  return (
    <Canvas 
      style={{ height: '80px', width: '80px' }}
      camera={{ position: [0, 0, 3] }}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} /> 
      {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
  )
}