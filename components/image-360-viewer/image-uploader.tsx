'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface ImageUploaderProps {
  onImagesUploaded: (images: string[]) => void
}

export function ImageUploader({ onImagesUploaded }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageUrls = acceptedFiles.map(file => URL.createObjectURL(file))
    onImagesUploaded(imageUrls)
  }, [onImagesUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag 'n' drop some images here, or click to select files
      </p>
      <p className="text-xs text-gray-500 mt-1">
        (Upload multiple images of your object from different angles)
      </p>
    </div>
  )
}

