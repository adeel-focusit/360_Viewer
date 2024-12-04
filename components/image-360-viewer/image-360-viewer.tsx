'use client'

import { useState } from 'react'
import { ImageUploader } from './image-uploader'
import { Viewer360 } from './viewer-360'

export function Image360Viewer() {
  const [images, setImages] = useState<string[]>([])

  const handleImagesUploaded = (uploadedImages: string[]) => {
    setImages(uploadedImages)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">360° Image Viewer</h1>
      {images.length === 0 ? (
        <ImageUploader onImagesUploaded={handleImagesUploaded} />
      ) : (
        <Viewer360 images={images} />
      )}
    </div>
  )
}

