import { Suspense } from 'react'
import CheckCodePassword from '@/app/auth/check-code-password/CheckCodePassword'

export default function Page() {
  return (
    <Suspense>
      <CheckCodePassword />
    </Suspense>
  )
}
