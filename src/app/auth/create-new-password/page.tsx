import { Suspense } from 'react'
import CreateNewPassword from '@/app/auth/create-new-password/CreateNewPassword'
import Loader from '@/components/ui/loader/Loader'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateNewPassword />
    </Suspense>
  )
}
