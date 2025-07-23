export type createPaymentRequest = {
  typeSubscription: string
  paymentType: string
  amount: number
  baseUrl: string
}

export type Data = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type getCurrentSubscriptionResponse = {
  data: Data[]
  hasAutoRenewal: boolean
}
