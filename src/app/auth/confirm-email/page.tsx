import { Suspense } from 'react'
import ConfirmationPage from '@/app/auth/confirm-email/ConfirmationPage'
import Loader from '@/components/ui/loader/Loader'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ConfirmationPage />
    </Suspense>
  )
}
