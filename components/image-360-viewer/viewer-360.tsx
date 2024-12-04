'use client'

import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Viewer360Props {
  images: string[]
}

export function Viewer360({ images }: Viewer360Props) {
  const [index, setIndex] = useState(0)
  const [{ x }, api] = useSpring(() => ({ x: 0 }))

  const bind = useDrag(({ movement: [mx], down, direction: [xDir], velocity }) => {
    if (down) {
      api.start({ x: mx })
    } else {
      // @ts-expect-error Type 'number' is not assignable to type 'number | undefined'.
      const moveNext = velocity > 0.2 || (Math.abs(mx) > 20 && xDir > 0)
      // @ts-expect-error Type 'number' is not assignable to type 'number | undefined'.
      const movePrev = velocity > 0.2 || (Math.abs(mx) > 20 && xDir < 0)
      
      if (moveNext && index < images.length - 1) {
        setIndex(i => i + 1)
      } else if (movePrev && index > 0) {
        setIndex(i => i - 1)
      }
      
      api.start({ x: 0, immediate: false })
    }
  })

  const nextImage = () => {
    if (index < images.length - 1) {
      setIndex(i => i + 1)
    }
  }

  const prevImage = () => {
    if (index > 0) {
      setIndex(i => i - 1)
    }
  }

  return (
    <div className="relative w-1/2 m-auto aspect-square">
      <div {...bind()} className="w-full h-full overflow-hidden cursor-grab"> 
        <animated.img
          src={images[index]}
          alt={`360 view ${index + 1}`}
          className="w-full h-full object-cover"
          style={{
            x,
            // cursor: 'grab',
            pointerEvents: 'none',
            // touchAction: 'none'
          }}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={prevImage}
          disabled={index === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {index + 1} / {images.length}
        </span>
        <Button
          variant="secondary"
          size="icon"
          onClick={nextImage}
          disabled={index === images.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

