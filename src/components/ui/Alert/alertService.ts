import { AlertData } from './AlertTypes'

let handler: ((alert: AlertData) => void) | null = null

export const alertService = {
  show(alert: AlertData) {
    if (handler) {
      handler(alert)
    }
  },
  subscribe(fn: (alert: AlertData) => void) {
    handler = fn
  },
}
