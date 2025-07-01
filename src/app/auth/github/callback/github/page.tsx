import { Suspense } from 'react'
import GitHubCallback from '@/app/auth/github/callback/github/GitHubCallback'

export default function Page() {
  return (
    <Suspense fallback={<div>Завершаем вход через github...</div>}>
      <GitHubCallback />
    </Suspense>
  )
}
