import { useGLTF } from '@react-three/drei'
import type { ProductConfiguration } from './types'

interface ProductModelProps {
  configuration: ProductConfiguration
}

export function ProductModel({ configuration }: ProductModelProps) {
  // For demonstration, we'll use a simple mesh
  // In a real application, you would load your GLB model here
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={configuration.fabricColor} />
    </mesh>
  )
}

