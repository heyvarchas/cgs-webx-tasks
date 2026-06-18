import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Temporary placeholder — real car model comes next */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Mouse/touch camera controls */}
      <OrbitControls />
    </Canvas>
  )
}