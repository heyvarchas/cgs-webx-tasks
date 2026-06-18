import { useGLTF } from '@react-three/drei'

export default function Car(props) {
  const { scene } = useGLTF('/models/car.glb')

  return <primitive object={scene} {...props} />
}