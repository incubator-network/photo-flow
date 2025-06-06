'use client'
import { Typography } from '@/components/typography/Typography'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/ui/button/Button'
import { Card } from '@/components/ui/superCard/Card'
import { Select } from '@/components/ui/Select/Select'

export default function Home() {
  return (
    <div>
      <Select
        placeholder='select-box'
        items={[{ title: '1' }, { title: '1' }, { title: '1' }]}
        className='w-[210px]'
        contentClassName='w-[210px]'
      />
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
        <Button>button</Button>
      </Card>
      <Input type='password' variant={'default'} />
    </div>
  )
}
