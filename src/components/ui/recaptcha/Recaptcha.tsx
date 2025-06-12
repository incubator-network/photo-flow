'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import { twMerge } from 'tailwind-merge'
import { RefObject } from 'react'
import { Typography } from '@/components/ui/typography/Typography'
import { captchaAction } from '@/features/auth/captcha/captchaAction'

type RecaptchaProps = {
  theme?: 'dark' | 'light'
  size?: 'normal' | 'compact' | 'invisible'
  lang?: 'en' | 'ru'
  className?: string
  error: boolean
  recaptchaRef: RefObject<ReCAPTCHA | null>
  isCaptchaVerifiedAction: (isHuman: boolean) => void
}

export const Recaptcha = ({
  lang = 'en',
  size = 'normal',
  theme = 'dark',
  className,
  error,
  recaptchaRef,
  isCaptchaVerifiedAction,
}: RecaptchaProps) => {
  const handleCaptchaAction = async (token: string | null) => {
    const isCaptchaVerified = await captchaAction(token)
    isCaptchaVerifiedAction(isCaptchaVerified)
  }

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
        sitekey={'6LcxEFgrAAAAAOlnUOjd6-K_fH0qcBNjflx3Pquz'}
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
