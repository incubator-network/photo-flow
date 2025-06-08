'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import { twMerge } from 'tailwind-merge'
import { RefObject } from 'react'
import { Typography } from '@/components/ui/typography/Typography'

type RecaptchaProps = {
  publicKey: string
  theme?: 'dark' | 'light'
  size?: 'normal' | 'compact' | 'invisible'
  lang?: 'en' | 'ru'
  error: boolean
  recaptchaRef: RefObject<ReCAPTCHA | null>
  handleCaptchaAction: (token: string | null) => void
}

export const Recaptcha = ({
  publicKey,
  lang = 'en',
  size = 'normal',
  theme = 'dark',
  error,
  recaptchaRef,
  handleCaptchaAction,
}: RecaptchaProps) => {
  return (
    <div
      className={twMerge(
        'w-fit flex-col px-[7px] py-[8px]',
        error ? 'border border-danger-500' : ''
      )}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={publicKey}
        theme={theme}
        size={size}
        hl={lang}
        onChange={handleCaptchaAction}
      />
      {error && (
        <Typography variant={'regular_text_14'} className={'text-danger-500'}>
          Please verify that you are not a robot
        </Typography>
      )}
    </div>
  )
}
