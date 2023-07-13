'use client'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MediaDisplay } from '@/components/Media/MediaDisplay'
import { useMemories } from '@/hooks/useMemories'
import { Spinner } from '../Spinner'
import { EmptyMemories } from '../EmptyMemories'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  updatedAt: string
}

export function Memories() {
  const { data, isLoading } = useMemories()

  if (data?.length === 0) {
    return <EmptyMemories />
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {data?.map((memories: Memory) => {
            return (
              <div key={memories.id} className="space-y-4">
                <time className="flex items-center justify-center text-lg text-gray-100 ">
                  {dayjs(memories.updatedAt).format('D[ de ]MMMM[, ]YYYY')}
                </time>
                <MediaDisplay coverUrl={memories.coverUrl} />

                <p className="overflow-auto text-lg leading-relaxed text-gray-100">
                  {memories.excerpt}
                </p>

                <Link
                  href={`/memories/${memories.id}`}
                  className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
                >
                  Ler mais
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
