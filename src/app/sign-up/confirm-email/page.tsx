'use client'

import { Typography } from '@/components/ui/typography/Typography'
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
      confirmEmail({ confirmationCode: code })
    } else {
      router.push('/sign-up')
    }
  }, [code, router, confirmEmail])
  return (
    // <div>
    //   <Typography variant={'h1'}>Congratulations!</Typography>
    //   <Typography variant={'regular_text_16'}>
    //     Your email has been confirmed
    //   </Typography>
    //   <Button asChild>
    //     <Link href={'/sign-in'}>
    //       <Typography variant={'h3'}>Sign In</Typography>
    //     </Link>
    //   </Button>
    // </div>

    <div className='flex min-h-screen items-center justify-center'>
      <Typography variant='h3'>Verifying your email...</Typography>
    </div>
  )
}
