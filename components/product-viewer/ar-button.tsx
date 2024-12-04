'use client'

import { Button } from '@/components/ui/button'
import { View } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ARButton() {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    const checkARSupport = async () => {
      const supported = navigator.xr && await navigator.xr.isSessionSupported('immersive-ar')
      setIsSupported(supported)
    }

    checkARSupport().catch(console.error)
  }, [])

  if (!isSupported) return null

  return (
    <Button variant="secondary" className="gap-2">
      <View className="h-4 w-4" />
      View in AR
    </Button>
  )
}

