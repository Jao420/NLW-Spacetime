import { Hero } from '@/components/Hero'
import './globals.css'
import { Copyright } from '@/components/Copyright'

import { MemoriesProvider } from '@/context/MemoriesContext'

import localFont from 'next/font/local'
const roboto = localFont({
  src: [
    {
      path: '../fonts/Roboto/Roboto-Regular.ttf',
      style: 'normal',
      weight: '400'
    },
    { path: '../fonts/Roboto/Roboto-Bold.ttf', style: 'bold', weight: '700' }
  ],
  fallback: ['system-ui', 'arial'],
  variable: '--font-roboto'
})

const baiJamjuree = localFont({
  src: '../fonts/Bai_Jamjuree/BaiJamjuree-Bold.ttf',
  weight: '700',
  fallback: ['system-ui', 'arial'],
  variable: '--font-bai-jamjuree'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-1  grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
          <div
            className="relative flex flex-col items-center gap-5 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-[0.41rem] py-[4rem] sm:px-6 md:gap-12 md:px-[6.5rem]  lg:items-start lg:justify-between
 lg:gap-0 lg:px-10 lg:py-16 xl:px-28 
      "
          >
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            <div className="absolute bottom-0 right-2 top-0 w-2  lg:bg-stripes" />

            <Hero />
            <Copyright />
          </div>

          <div className="flex max-h-[50vh] flex-col bg-[url(../assets/bg-stars.svg)] bg-cover lg:max-h-screen lg:overflow-y-auto">
            <MemoriesProvider> {children} </MemoriesProvider>
          </div>
        </main>
      </body>
    </html>
  )
}
