'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  defaultPreview: string | null
}

export function MediaPicker({ defaultPreview }: MediaPickerProps) {
  const [preview, setPreview] = useState(defaultPreview)
  const [displayVideo, setDisplayVideo] = useState(false)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || files.length === 0) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  const handleImageError = () => {
    setDisplayVideo(!displayVideo)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        <>
          {displayVideo ? (
            <video
              src={preview}
              muted
              controls
              onError={handleImageError}
              className="aspect-video w-full rounded-lg object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt=""
              onError={handleImageError}
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}
        </>
      )}
    </>
  )
}
