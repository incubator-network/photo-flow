'use client'

import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Recaptcha } from '@/components/ui/recaptcha/Recaptcha'
import { Button } from '@/components/ui/button/Button'
import { Typography } from '@/components/ui/typography/Typography'
import { Input } from '@/components/ui/input/Input'

export default function RecaptchaTest() {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [serverError, setServerError] = useState('')
  const [error, setError] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const captchaRef = useRef<ReCAPTCHA>(null)

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setError(false)
      setInProgress(false)
      setTimeout(() => setShowCaptcha(false), 2000) // можно убрать эту строку или поменять время при необходимости
    }
  }

  const onSubmit = async () => {
    if (inProgress) {
      setError(true)
      return
    }
    try {
      const response = await fetch('api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(showCaptcha && {
            recaptcha: captchaRef.current?.getValue(),
          }),
          baseUrl: window.location.origin,
        }),
      })
      if (response.status === 429) {
        setInProgress(true)
        setShowCaptcha(true)
      } else if (response.status === 200) {
        setError(false)
        setShowCaptcha(false)
      } else if (response.status === 500) {
        setServerError('SERVER ERROR')
      }
    } catch (e) {
      setInProgress(false)
      setServerError('SERVER ERROR:\n' + JSON.stringify(e))
    }
  }

  return (
    <div className='my-9 ml-9 flex flex-col items-start gap-3.5'>
      <Typography variant={'small_text'}>
        Капча появляется после 5-го нажатия кнопки
      </Typography>
      <Typography variant={'h1'}>Forgot Password</Typography>
      <Input type={'email'} variant={'default'} value={'photo-flow@mail.com'} />

      {showCaptcha && (
        <div className='mt-4'>
          <Recaptcha
            recaptchaRef={captchaRef}
            publicKey={'6LcxEFgrAAAAAOlnUOjd6-K_fH0qcBNjflx3Pquz'}
            error={error}
            handleCaptchaAction={handleCaptchaChange}
          />
        </div>
      )}

      <Button onClick={onSubmit}>Send Link</Button>
      {serverError && (
        <Typography variant={'h1'}>ERROR: {serverError}</Typography>
      )}
    </div>
  )
}
