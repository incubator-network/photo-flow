import { Suspense } from 'react'
import GitHubCallback from '@/app/auth/github/callback/GitHubCallback'
import Loader from '@/components/ui/loader/Loader'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <GitHubCallback />
    </Suspense>
  )
}
