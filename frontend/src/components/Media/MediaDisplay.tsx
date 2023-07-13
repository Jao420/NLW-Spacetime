import Image from 'next/image'

interface MediaDisplayProps {
  coverUrl: string
}

export function MediaDisplay({ coverUrl }: MediaDisplayProps) {
  const videoRegex = /\.(mp4|mov|avi|wmv|flv|mkv)$/i

  const isVideo = videoRegex.test(coverUrl)

  return (
    <>
      {isVideo ? (
        <video
          src={coverUrl}
          muted
          controls
          className="aspect-video w-full rounded-lg object-cover"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={coverUrl}
          width={500}
          height={280}
          alt="imagem enviada pelo usuário."
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
