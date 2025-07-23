export type AlertType = 'success' | 'error'

export type AlertData = {
  message: string
  type: AlertType
}

export type AlertContextType = {
  showAlert: (data: AlertData) => void
}
