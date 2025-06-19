'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  useCheckRecoveryCodeMutation,
  useConfirmEmailMutation,
} from '@/lib/api/authApi'
import { ResponseError } from '@/lib/api/authApi.types'

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [confirmEmail] = useConfirmEmailMutation()
  const [checkCode] = useCheckRecoveryCodeMutation()

  useEffect(() => {
    if (!code) return

    const checkCodeValidity = async () => {
      try {
        await checkCode({ recoveryCode: code }).unwrap()

        await confirmEmail({ confirmationCode: code }).unwrap()
        router.push('/auth/confirm-email/success')
      } catch (e) {
        // Обработать ошибки в случае провала ConfirmEmail
        // 400 status - Incorrect input data. Смотреть Swagger
        const err = e as ResponseError
        router.push('/auth/confirm-email/expired')
        console.log('Confirmation error: ', err.data.messages[0].message)
      }
    }
    checkCodeValidity()
  }, [code, router, confirmEmail, checkCode])
  return <></>
}
