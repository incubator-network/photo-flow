'use client'
import GoogleIcon from '@/assets/icons/google.svg'
import GitHubIcon from '@/../public/GitHubIcon.svg'
import Link from 'next/link'
import { Input } from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { LoginFields, signInSchema } from '@/lib/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/lib/api/authApi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLazyGetProfileQuery } from '@/lib/api/profileApi'
import { Typography } from '@/components/ui/typography/Typography'

type ApiError = {
  status: number
  data: {
    error: string
    messages: string
    statusCode: number
  }
}

export default function SignIn() {
  const [login] = useLoginMutation()
  const [loginError, setLoginError] = useState('')
  const [profile] = useLazyGetProfileQuery()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFields>({
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFields) => {
    try {
      await login(data)
      const loginResponse = await login(data).unwrap()
      localStorage.setItem('auth-token', loginResponse.accessToken)
      reset()

      const profileResponse = await profile().unwrap()
      console.log(profileResponse)

      if (profileResponse.firstName && profileResponse.lastName) {
        // Если есть имя, фамилия в профиле(создан, заполнен)
        router.push('/profile') // Изменить на название роута в будущем
      } else {
        // Если профиль не создан
        router.push('/profileCreate') // Изменить на название роута в будущем
      }
    } catch (error: unknown) {
      const apiError = error as ApiError

      if (apiError.data) {
        setLoginError('The email or password are incorrect. Try again please')
      } else {
        console.log(error)
      }
    }
  }

  return (
    <>
      <p>header</p>
      <section
        className={`border-dark-300 bg-dark-500 mx-auto w-[380px] rounded-xs border border-solid p-6`}
      >
        <h2
          className={`mb-[13px] flex justify-center text-xl leading-[1.8] font-bold`}
        >
          Sign In
        </h2>

        <div className={`mb-6 flex items-center justify-center gap-15`}>
          <a href='#'>
            <GoogleIcon className='h-9 w-9' />
          </a>
          <a href='#'>
            <GitHubIcon className='h-9 w-9' />
          </a>
        </div>

        {loginError && (
          <Typography variant={'h3'} className={'text-danger-500 text-center'}>
            {loginError}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
          <div className='mb-9 flex flex-col gap-6'>
            <Input
              placeholder='Epam@epam.com'
              type='email'
              className={`w-full`}
              errorText={errors ? errors.email?.message : ''}
              {...register('email')}
              onChange={() => {
                setLoginError('')
              }}
            />
            <Input
              placeholder='**********'
              type='password'
              className={`w-full`}
              errorText={errors.password?.message}
              {...register('password')}
              onChange={() => {
                setLoginError('')
              }}
            />
          </div>

          <Button
            asChild
            variant='text'
            className='text-light-900 mb-6 ml-auto w-[112px] border-0 p-0'
          >
            <Link href={'/auth/forgot-password'}>
              <Typography variant={'regular_text_14'}>
                Forgot Password
              </Typography>
            </Link>
          </Button>
          <div className='flex flex-col items-center'>
            <Button
              variant='primary'
              className='mb-[18px] flex w-full justify-center font-semibold'
              type='submit'
            >
              Sign In
            </Button>
            <p className='mb-[6px] leading-[1.5]'>Don’t have an account?</p>
            <Button
              asChild
              variant='text'
              className='leading-[1.5] font-semibold'
            >
              <Link href={'/auth/sign-up'}>Sign Up</Link>
            </Button>
          </div>
        </form>
      </section>
    </>
  )
}
