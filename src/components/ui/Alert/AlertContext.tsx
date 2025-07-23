import { createContext, useContext } from 'react'
import { AlertContextType } from './AlertTypes'

export const AlertContext = createContext<AlertContextType | null>(null)

export function useAlert() {
  const context = useContext(AlertContext)
  return context
}
