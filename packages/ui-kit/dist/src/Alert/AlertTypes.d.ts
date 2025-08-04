import { ReactNode } from 'react'
export type AlertType = 'success' | 'error'
export type AlertData = {
  message: ReactNode
  type: AlertType
}
export type AlertContextType = {
  showAlert: (data: AlertData) => void
}
