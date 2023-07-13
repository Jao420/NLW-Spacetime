import { api } from '@/lib/api'

import { useQuery } from 'react-query'
import Cookie from 'js-cookie'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  updatedAt: string
}

export async function getMemories() {
  const token = Cookie.get('token')

  const response = await api.get(`/memories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const memories: Memory[] = response.data

  return memories
}

export function useMemories() {
  return useQuery('memories', () => getMemories())
}
