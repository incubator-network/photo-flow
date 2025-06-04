import { Typography } from '@/components/typography/Typography'
import { Input } from '@/components/input/Input'
import { SuperButton } from '@/components/ui/button/superButton'
import { Textarea } from '@/components/ui/textarea/Textarea'

const variants = [
  'default',
  'active',
  'hover',
  'focus',
  'disabled',
  'error',
] as const

const inputTypes = ['email', 'password', 'search'] as const
export default function Home() {
  return (
    <div>
      <div className={'bg-danger-700 font-sans text-h1 text-center mt-20'}>
        Hello this a test string
      </div>
      <Typography variant={'h1'} className={'text-center mt-5 bg-danger-700'}>
        Typography example
      </Typography>
      <div
        className={
          'bg-success-900 font-sans text-h1 text-center mt-20 ml-10   '
        }
      >
        Hello this a test string
        <div className={'flex flex-row  flex-wrap gap-x-3'}>
          {variants.map(variant => {
            return (
              <div className={'flex flex-col justify-center gap-y-1'}>
                {inputTypes.map(type => {
                  return (
                    <>
                      {type !== 'email' ? (
                        ''
                      ) : (
                        <span
                          className={'text-regular-14'}
                          key={`${variant} + ${type}`}
                        >
                          Email
                        </span>
                      )}
                      <Input
                        variant={variant}
                        type={type}
                        key={`${variant} + ${type} +1`}
                        placeholder={
                          type === 'search'
                            ? 'Input search'
                            : 'Epam@example.com'
                        }
                      />
                    </>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
