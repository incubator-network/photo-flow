export type ForgotPasswordRequest = {
  email: string
  recaptcha: string | null
  baseUrl: string
}

export type ResponseError = {
  status: number
  data: {
    error: string
    statusCode: number
    messages: MessagesError[]
  }
}

export type ResendEmailRequest = {
  email: string | null
  baseUrl: string
}

export type MessagesError = {
  message: string
  field: string
}

export type MeResponse = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}
