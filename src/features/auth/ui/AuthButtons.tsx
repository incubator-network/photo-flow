'use client'
import { GitHubLoginButton } from '@/features/auth/ui/GitHubLoginButton '
import { LoginWithGoogleButton } from '@/features/auth/ui/LoginWithGoogleButton'

export const AuthButtons = () => {
  return (
    <div className='flex gap-[60px]'>
      <LoginWithGoogleButton />
      <GitHubLoginButton />
    </div>
  )
}
