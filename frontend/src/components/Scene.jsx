import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Car from './Car.jsx'
import Loader from './Loader.jsx'

export default function Scene() {
  return (
    <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Car model, wrapped in Suspense so it doesn't break while loading */}
      <Suspense fallback={<Loader />}>
        <Environment preset='city' />
        <Car position={[0, -0.5, 0]} />
      </Suspense>

      {/* Mouse/touch camera controls */}
      <OrbitControls />
    </Canvas>
  )
}