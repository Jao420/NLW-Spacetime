import { UpdateMemoryForm } from '@/components/UpdateMemory/UpdateMemoryForm'

export default async function EditMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-10 lg:p-16">
      <UpdateMemoryForm />
    </div>
  )
}
