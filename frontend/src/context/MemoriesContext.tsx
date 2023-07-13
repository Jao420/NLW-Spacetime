'use client'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface MemoriesProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const MemoriesProvider = ({ children }: MemoriesProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
