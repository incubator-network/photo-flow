'use client'
import IconGitHub from '@/assets/icons/github-svgrepo-com.svg'

export const GitHubLoginButton = () => {
  const handleLogin = () => {
    const redirect = encodeURIComponent('http://localhost:3000/auth/github/callback')
    window.location.href = `http://inctagram.work/api/v1/auth/github/login?redirect_url=${redirect}`
  }
  return (
    <button className='cursor-pointer' onClick={handleLogin}>
      <IconGitHub width={'36'} height={'36'} />
    </button>
  )
}
