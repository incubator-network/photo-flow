'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import { twMerge } from 'tailwind-merge'
import { RefObject } from 'react'
import { Typography } from '@/components/ui/typography/Typography'

type RecaptchaProps = {
  theme?: 'dark' | 'light'
  size?: 'normal' | 'compact' | 'invisible'
  lang?: 'en' | 'ru'
  className?: string
  error: boolean
  recaptchaRef: RefObject<ReCAPTCHA | null>
  handleCaptchaAction: (token: string | null) => void
}

export const Recaptcha = ({
  lang = 'en',
  size = 'normal',
  theme = 'dark',
  className,
  error,
  recaptchaRef,
  handleCaptchaAction,
}: RecaptchaProps) => {
  return (
    <div
      className={twMerge(
        'w-fit flex-col px-[7px] py-[8px]',
        error ? 'border-danger-500 border' : '',
        className
      )}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
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
