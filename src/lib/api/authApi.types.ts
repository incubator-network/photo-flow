export type ForgotPasswordRequest = {
  email: string
  recaptcha: string | null
  baseUrl: string
}

export type ForgotPasswordRequestError = {
  status: number
  data: {
    error: string
    statusCode: number
    messages: Array<{ field: string; message: string }>
  }
}
