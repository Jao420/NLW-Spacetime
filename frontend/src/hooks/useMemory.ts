import { api } from '@/lib/api'

import { useQuery } from 'react-query'
import Cookie from 'js-cookie'
import { useParams } from 'next/navigation'

export async function getMemory(paramsId: string) {
  const token = Cookie.get('token')

  const { data } = await api.get(`/memories/${paramsId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { content, coverUrl, id, isPublic } = data

  return { content, coverUrl, id, isPublic }
}

export function useMemory() {
  const params = useParams()
  const { id } = params
  return useQuery(['memory', id], () => getMemory(id))
}
