'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Trash2, XIcon, Check } from 'lucide-react'
import { api } from '@/lib/api'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface DeleteProps {
  id: string
}

export function DeleteMemoryModal({ id }: DeleteProps) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const router = useRouter()
  const token = Cookies.get('token')

  async function DeleteMemory() {
    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.replace('/')
    router.refresh()
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <Trash2 className="h-4 w-4" />
        Deletar memória
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-zinc-900 p-8 text-left align-middle shadow-xl transition-all">
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex gap-1 rounded-md border-2 border-red-500  px-4 py-2 text-center text-lg text-gray-200 hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900

                      "
                      onClick={closeModal}
                    >
                      <XIcon className=" h-5.5 w-5.5 text-center text-red-500 " />
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="inline-flex gap-1 rounded-md border-2 border-green-500  px-4 py-2 text-center text-lg text-gray-200 hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900

                      "
                      onClick={DeleteMemory}
                    >
                      <Check className=" h-5.5 w-5.5 text-center text-green-500" />
                      Deletar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
