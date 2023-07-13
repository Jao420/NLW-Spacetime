'use client'
import { Camera } from 'lucide-react'
import { MediaPicker } from '../Media/MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      if (uploadResponse.data === null) {
        return alert('você não anexou nenhuma mídia')
      }
      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic')
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker defaultPreview={null} />
      <textarea
        name="content"
        spellCheck={false}
        wrap="hard"
        required
        className="h-[7rem] w-full resize-none rounded border-0 bg-transparent p-0 text-sm leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0 md:h-[15rem] lg:flex-1 lg:text-lg"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}
