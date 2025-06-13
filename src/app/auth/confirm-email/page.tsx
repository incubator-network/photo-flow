'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useConfirmEmailMutation } from '@/lib/api/authApi'

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [confirmEmail] = useConfirmEmailMutation()

  useEffect(() => {
    if (code) {
      console.log(code)
      confirmEmail({ confirmationCode: code })
        .unwrap()
        .then(() => {
          debugger
          router.push('/auth/confirm-email/success')
        })
        .catch(err => {
          router.push('/auth/confirm-email/expired')
          console.log('Confirmation error: ', err.data.messages[0].message)
        })
    }
  }, [code, router, confirmEmail])
  return <></>
}
