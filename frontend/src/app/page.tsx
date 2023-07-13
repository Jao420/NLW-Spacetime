import { EmptyMemories } from '@/components/EmptyMemories'
import { Memories } from '@/components/Memories/Memories'
import { cookies } from 'next/headers'

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-10 lg:p-16">
      <Memories />
    </div>
  )
}
