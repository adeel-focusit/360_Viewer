'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Expand, ZoomIn, ZoomOut } from 'lucide-react'
import { ProductCustomizer } from './product-customizer'
import { ViewerControls } from './viewer-controls'
import { ProductModel } from './product-model'
import { ARButton } from './ar-button'
import { ThumbnailStrip } from './thumbnail-strip'
import type { ProductConfiguration } from './types'

export function ProductViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [config, setConfig] = useState<ProductConfiguration>({
    fabricColor: '#40A2AB', // Default teal color
    legMaterial: 'walnut',
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 p-4" ref={containerRef}>
      <Card className="relative aspect-square">
        <div className="absolute top-4 left-4 z-10">
          <ARButton />
        </div>
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setZoom(Math.max(zoom - 0.5, 1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setZoom(Math.min(zoom + 0.5, 3))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
          >
            <Expand className="h-4 w-4" />
          </Button>
        </div>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 1, 3]} />
          <OrbitControls
            enableZoom={true}
            minDistance={2}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
          <ProductModel configuration={config} />
          <Environment preset="apartment" />
        </Canvas>
      </Card>
      <ProductCustomizer
        configuration={config}
        onChange={setConfig}
      />
      <div className="lg:col-span-2">
        <ThumbnailStrip />
      </div>
    </div>
  )
}

