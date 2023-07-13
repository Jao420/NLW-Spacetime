export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-start justify-center p-16 lg:items-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a {''}
        <a href="/memories/new/" className="underline hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
