'use client'

import { Card } from '@/components/ui/Card/Card'
import { Typography } from '@/components/ui/typography/Typography'
import GitHubIcon from '@/assets/icons/github-svgrepo-com.svg'
import GoogleIcon from '@/assets/icons/google.svg'
import { Input } from '@/components/ui/input/Input'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { Button } from '@/components/ui/button/Button'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrationFields, signUpSchema } from '@/lib/schemas/signUpSchema'
import { useRegistrationMutation } from '@/lib/api/authApi'

export default function SingUp() {
  // const router = useRouter()

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isValid, isDirty },
  } = useForm<RegistrationFields>({
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      agreement: false,
    },
  })

  const [registration] = useRegistrationMutation()

  const onSubmit: SubmitHandler<RegistrationFields> = async data => {
    console.log(data)
    try {
      await registration({
        userName: data.username,
        email: data.email,
        password: data.password,
        baseUrl: window.location.origin,
      })
      // reset()
      // router.push('/sign-up/confirm-email')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return (
    // margin не забыть убрать!!!
    <Card className={'m-10 flex max-w-[378px] flex-col items-center p-6'}>
      <Typography variant={'h1'} className={'mb-3'}>
        Sign Up
      </Typography>
      <div className={'mb-6 flex gap-15'}>
        <GitHubIcon className={'h-9 w-9'} />
        <GoogleIcon className={'h-9 w-9'} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'mb-[18px] flex w-full flex-col items-center'}
      >
        <div className={'mb-3 flex w-full flex-col'}>
          <Input
            className={'min-h-[84px]'}
            type={'username'}
            errorText={errors.username?.message}
            {...register('username')}
          />
          <Input
            className={'min-h-[84px]'}
            type={'Email'}
            errorText={errors.email?.message}
            {...register('email')}
          />
          <Input
            className={'min-h-[84px]'}
            type={'password'}
            errorText={errors.password?.message}
            {...register('password')}
          />
          <Input
            type={'password'}
            errorText={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />
        </div>
        <div className={'mb-3 flex w-full items-center'}>
          <Checkbox required id={'agreement'} {...register('agreement')} />
          <Typography variant={'small_text'}>
            I agree to the&nbsp;
            <Link href={'/sign-up/terms'}>
              <Typography variant={'small_link'}>Terms of Service</Typography>
            </Link>
            <Typography variant={'small_text'}> and </Typography>
            <Link href={'/sign-up/privacy'}>
              <Typography variant={'small_link'}>Privacy Policy</Typography>
            </Link>
          </Typography>
        </div>
        <Button className={'w-full'} disabled={!isValid || !isDirty}>
          <Typography variant={'h3'}>Sign Up</Typography>
        </Button>
      </form>
      <Typography variant={'regular_text_16'} className={'mb-1.5'}>
        Do you have an account?
      </Typography>
      <Button className={'w-full text-center'} variant={'text'} asChild>
        <Link href={'/sign-in'}>Sign In</Link>
      </Button>
    </Card>
  )
}
