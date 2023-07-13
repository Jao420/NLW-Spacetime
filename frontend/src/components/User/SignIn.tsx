import { User } from 'lucide-react'
import Link from 'next/link'

export function SignIn() {
  return (
    <Link
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="mb-[3rem] flex  items-center gap-3 text-left transition-colors hover:text-gray-50 md:mb-[5rem] "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="w-10 text-gray-500 lg:h-5 lg:w-5" />
      </div>
      <p className="w-[150px] text-sm leading-snug lg:max-w-[140px]">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </Link>
  )
}
