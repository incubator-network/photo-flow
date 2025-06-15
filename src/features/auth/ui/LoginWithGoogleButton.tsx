'use client'

import IconGoogle from '@/assets/icons/google.svg'

export const LoginWithGoogleButton = () => {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    const redirectUri = 'http://localhost:3000/auth/google/callback'
    const scope = 'openid email profile'

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`

    window.location.href = oauthUrl
  }

  return (
    <button className='cursor-pointer' onClick={handleLogin}>
      <IconGoogle width={'34'} height={'34'} />
    </button>
  )
}
//GOOGLE_CLIENT_ID=272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com
