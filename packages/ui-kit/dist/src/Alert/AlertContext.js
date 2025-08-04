'use client'
import { createContext, useContext } from 'react'
export const AlertContext = createContext(null)
export function useAlert() {
  const context = useContext(AlertContext)
  return context
}
