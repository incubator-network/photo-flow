'use client'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { store } from '@/lib/store'

export function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
