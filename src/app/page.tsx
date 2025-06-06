'use client'

import { Typography } from '@/components/typography/Typography'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/ui/button/Button'
import { Card } from '@/components/ui/superCard/Card'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  description: string
}

export default function Home() {
  const {
    // добавлен префикс "1" для разрешения конфликтов с будущими формами
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm<FormData>()

  const onSubmit1 = (data: FormData) => {
    console.log('Form data:', data)
  }

  const [text, setText] = useState('')
  const maxLength = 8
  const error = text.length > maxLength ? 'Превышен лимит символов' : null

  return (
    <div style={{ height: '2000px', width: '120%' }}>
      <div className={'bg-danger-700 font-sans text-h1 text-center mt-20'}>
        Hello this a test string
      </div>
      <Typography variant={'h1'} className={'text-center mt-5 bg-danger-700'}>
        Typography example
      </Typography>
      <Button>
        <Typography variant={'h1'}>Button example</Typography>
      </Button>
      <Button variant={'secondary'}>
        <Typography variant={'h1'}>Button example</Typography>
      </Button>
      <Button variant={'outline'}>
        <Typography variant={'h1'}>Button example</Typography>
      </Button>
      <Button variant={'text'}>
        <Typography variant={'h1'}>Button example</Typography>
      </Button>
      <Card className={'w-40 h-40 m-10'}>
        <Typography variant={'bold_text_16'}>
          Button example Button exampleButton exampleButton exampleButton
          exampleButton exampleButton example
        </Typography>
      </Card>
      <Input type='password' variant={'default'} />

      <div>
        <hr style={{ margin: '50px 0' }} />
        <form
          className={'flex flex-col gap-3.5'}
          onSubmit={handleSubmit1(onSubmit1)}
        >
          <Textarea
            {...register1('description', {
              minLength: { value: 3, message: 'min 3 characters' },
              maxLength: { value: 10, message: 'max 10 characters' },
            })}
            textareaLabel={'With RHF'}
            className={'w-[440px] h-[84px]'}
            error={errors1.description?.message}
          />
          <Button
            type='submit'
            variant={'outline'}
            className={'w-[100px] h-[40px]'}
          >
            Send
          </Button>
        </form>
        <hr style={{ margin: '50px 0' }} />
        <Textarea
          textareaLabel={'About me'}
          className={'w-[330px] h-[120px]'}
          value={text}
          changeValue={setText}
          error={error}
        />
        <hr className={'mt-10'} />
      </div>
    </div>
  )
}
