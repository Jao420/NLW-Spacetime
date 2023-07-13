import { MemoryContent } from '@/components/Memory/MemoryContent'

export default async function Memories() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-10 lg:p-16">
      <MemoryContent />
    </div>
  )
}
