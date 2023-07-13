import Image from 'next/image'
import spacetimeLogo from '../assets/spacetime-logo.svg'
import Link from 'next/link'
import { SignIn } from './User/SignIn'
import { Profile } from './User/Profile'
import { cookies } from 'next/headers'

export function Hero() {
  const isAuthenticated = cookies().has('token')
  return (
    <div className="space-y-5 text-center lg:text-start">
      {isAuthenticated ? <Profile /> : <SignIn />}
      <Image src={spacetimeLogo} alt="spacetime logo" />

      <div className="w-[100%] space-y-4 lg:w-[95%]">
        <h1 className="text-3xl font-bold leading-tight text-gray-50 md:text-[3.5rem] lg:text-5xl">
          Sua cápsula do tempo
        </h1>
        <p className="text-sm leading-relaxed md:text-xl lg:text-lg">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        href="/memories/new"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
