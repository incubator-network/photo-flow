'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  useCheckRecoveryCodeMutation,
  useResendPasswordEmailMutation,
} from '@/lib/feature/auth/api/authApi'
import { ResponseError } from '@/lib/feature/auth/api/authApi.types'

export default function CheckCodePassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const [resendEmail] = useResendPasswordEmailMutation()
  const [checkCode] = useCheckRecoveryCodeMutation()

  useEffect(() => {
    if (!code) return

    const checkCodeValidity = async () => {
      try {
        await checkCode({ recoveryCode: code }).unwrap()
        router.push(`/auth/create-new-password?code=${code}`)
      } catch (e) {
        // Обработать ошибки в случае провала ConfirmEmail
        // 400 status - Incorrect input data. Смотреть Swagger
        const err = e as ResponseError
        router.push(`/auth/forgot-password/expired?email=${email}`)
        console.log('Confirmation error: ', err.data.messages[0].message)
      }
    }
    checkCodeValidity()
  }, [code, router, resendEmail, checkCode, email])
  return <></>
}
