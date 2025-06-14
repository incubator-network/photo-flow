'use client'
import { Typography } from '@/components/ui/typography/Typography'
import Image from 'next/image'
import { Input } from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { useResendEmailMutation } from '@/lib/api/authApi'
import { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState<string>('')

  const [resendEmail] = useResendEmailMutation()

  const sendVerificationLink = async () => {
    try {
      await resendEmail({ email, baseUrl: window.location.origin })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={'mt-9 flex h-full w-full flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography
        className={'mb-[30px] max-w-[294px] text-center'}
        variant={'regular_text_16'}
      >
        Looks like the verification link has expired. Not to worry, we can send
        the link again
      </Typography>
      <Input
        type={'email'}
        className={'mb-6 w-[230px]'}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        onClick={sendVerificationLink}
        className={'mb-9'}
        disabled={!email}
      >
        Resend verification link
      </Button>
      <Image
        width={474}
        height={352}
        src={'/expired-email.webp'}
        alt={'expired email link'}
      />
    </div>
  )
}
