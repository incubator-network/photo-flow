import { Suspense } from 'react'
import CreateNewPassword from '@/app/auth/create-new-password/CreateNewPassword'

export default function Page() {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <CreateNewPassword />
    </Suspense>
  )
}
