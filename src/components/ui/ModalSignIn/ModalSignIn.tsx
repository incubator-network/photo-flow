import GoogleIcon from '@/../public/google.svg'
import GitHubIcon from '@/../public/GitHubIcon.svg'
import { Input } from '../input/Input'
import { Button } from '../button/Button'

export const ModalSignIn = () => {
  return (
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

      <form action='#' className={`flex flex-col`}>
        <div className='mb-9 flex flex-col gap-6'>
          <Input
            placeholder='Epam@epam.com'
            type='email'
            className={`w-full`}
          />
          <Input
            placeholder='**********'
            type='password'
            className={`w-full`}
          />
        </div>

        <a href='#'></a>
        <Button
          asChild
          variant='text'
          className='text-light-900 mb-6 flex justify-end p-0 text-sm leading-[1.71]'
        >
          <a href='#'>Forgot Password</a>
        </Button>
        <div className='flex flex-col items-center'>
          <Button
            variant='primary'
            className='mb-[18px] flex w-full justify-center font-semibold'
          >
            Sign In
          </Button>
          <p className='mb-[6px] leading-[1.5]'>Don’t have an account?</p>
          <Button
            asChild
            variant='text'
            className='leading-[1.5] font-semibold'
          >
            <a href='#'>Sign Up</a>
          </Button>
        </div>
      </form>
    </section>
  )
}
