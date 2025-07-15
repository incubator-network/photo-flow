import { Suspense } from 'react'
import ConfirmationPage from '@/app/auth/confirm-email/ConfirmationPage'

export default function Page() {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <ConfirmationPage />
    </Suspense>
  )
}
