import { ChevronLeft, Edit } from 'lucide-react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export function Nav() {
  const params = useParams()

  return (
    <nav>
      <div className="flex justify-between">
        <Link
          href="/"
          className="inline-flex  items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <Link
          href={`/memories/update/${params.id}`}
          className="inline-flex cursor-pointer gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Edit className="h-4 w-4" />
          Editar memória
        </Link>
      </div>
    </nav>
  )
}
