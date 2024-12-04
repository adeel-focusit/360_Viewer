import Image from 'next/image'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CuboidIcon as Cube, ImageIcon, View } from 'lucide-react'

const THUMBNAILS = [
  { icon: <View className="h-6 w-6" />, label: '360° View' },
  { icon: <Cube className="h-6 w-6" />, label: '3D Model' },
  { icon: <ImageIcon className="h-6 w-6" />, label: 'Photo' },
]

export function ThumbnailStrip() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {THUMBNAILS.map((thumbnail, i) => (
          <button
            key={i}
            className="flex h-20 w-20 items-center justify-center rounded-md border bg-muted"
          >
            {thumbnail.icon}
          </button>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`img-${i}`} className="relative h-20 w-20">
            <Image
              src={`/placeholder.svg?height=80&width=80`}
              alt={`Product view ${i + 1}`}
              className="rounded-md object-cover"
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

