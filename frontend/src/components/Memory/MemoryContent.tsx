'use client'

import { useMemory } from '@/hooks/useMemory'
import { MediaDisplay } from '../Media/MediaDisplay'
import { Spinner } from '../Spinner'
import { Nav } from './Nav'

export function MemoryContent() {
  const { data, isLoading } = useMemory()

  return (
    <>
      <Nav />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-4">
          <MediaDisplay coverUrl={data?.coverUrl} />
          <p className="max-h-[50vh] overflow-auto text-lg leading-relaxed text-gray-100">
            {data?.content}
          </p>
        </div>
      )}
    </>
  )
}
