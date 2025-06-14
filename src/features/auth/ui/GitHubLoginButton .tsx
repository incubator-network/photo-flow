'use client'
import { IconGitHub } from '@/components/ui/icons/IconGitHub/IconGitHub'
export const GitHubLoginButton = () => {
  const handleLogin = () => {
    const redirect = encodeURIComponent(
      'http://localhost:3000/auth/github/callback'
    )
    window.location.href = `http://inctagram.work/api/v1/auth/github/login?redirect_url=${redirect}`
  }
  return (
    <button className='cursor-pointer' onClick={handleLogin}>
      <IconGitHub
        width={'34'}
        height={'34'}
        viewBox={'0 0 25 25'}
        fill={'white'}
      />
    </button>
  )
}
