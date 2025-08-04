'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import ReCAPTCHA from 'react-google-recaptcha'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../Typography'
export const Recaptcha = ({
  lang = 'en',
  size = 'normal',
  theme = 'dark',
  className,
  error,
  recaptchaRef,
  handleCaptchaAction,
}) => {
  return _jsxs('div', {
    className: twMerge(
      'w-fit flex-col px-[7px] py-[8px]',
      error ? 'border-danger-500 border' : '',
      className
    ),
    children: [
      _jsx(ReCAPTCHA, {
        ref: recaptchaRef,
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        theme: theme,
        size: size,
        hl: lang,
        onChange: handleCaptchaAction,
      }),
      error &&
        _jsx(Typography, {
          variant: 'regular_text_14',
          className: 'text-danger-500',
          children: 'Please verify that you are not a robot',
        }),
    ],
  })
}
