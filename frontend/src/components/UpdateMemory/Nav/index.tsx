import { useParams } from 'next/navigation'
import { DeleteMemoryModal } from './DeleteMemoryModal'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export function Nav() {
  const params = useParams()

  return (
    <nav>
      <div className="flex justify-between">
        <Link
          href={`/memories/${params.id}`}
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar
        </Link>
        <DeleteMemoryModal id={params.id} />
      </div>
    </nav>
  )
}
