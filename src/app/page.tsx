import { Typography } from '@/components/typography/Typography'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/ui/button/Button'
import { Card } from '@/components/ui/superCard/Card'

export default function Home() {
  return (
    <div>
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
      <div
        className={
          'bg-success-900 font-sans text-h1 text-center mt-20 ml-10   '
        }
      >
        Hello this a test string
        <div className={'flex flex-row  flex-wrap gap-x-3'}>
          <div className={'flex flex-col justify-center'}>
            <Input
              variant={'default'}
              type={'email'}
              placeholder={' Epam@epam.com'}
            />
            <Input
              variant={'default'}
              type={'password'}
              placeholder={' Epam@epam.com'}
            />
            <Input
              variant={'default'}
              type={'search'}
              placeholder={'Input search'}
            />
          </div>

          {/*<Input type={'search'} variant={'default'} placeholder={'default'} />*/}
          <div className={'flex flex-col justify-center'}>
            <Input
              variant={'active'}
              type={'email'}
              placeholder={'Epam@epam.com'}
            />
            <Input
              variant={'active'}
              type={'password'}
              placeholder={'Epam@epam.com'}
            />
            <Input
              variant={'active'}
              type={'search'}
              placeholder={'Input search'}
            />
          </div>
          <div className={'flex flex-col justify-center'}>
            <Input
              variant={'hover'}
              type={'email'}
              placeholder={'Epam@epam.com'}
            />
            <Input
              variant={'hover'}
              type={'password'}
              placeholder={'Epam@epam.com'}
            />
            <Input
              variant={'hover'}
              type={'search'}
              placeholder={'Input search'}
            />
          </div>
          <div className={'flex flex-col justify-center'}>
            <Input
              variant={'focus'}
              type={'email'}
              placeholder={'Epam@epam.com'}
            />
            <Input
              variant={'focus'}
              type={'password'}
              placeholder={'Epam@epam.com'}
            />
            <Input
              variant={'focus'}
              type={'search'}
              placeholder={'Input search'}
            />
          </div>
          <div className={'flex flex-col justify-center'}>
            <Input
              type={'email'}
              variant={'disabled'}
              placeholder={'Epam@epam.com'}
              disabled
            />
            <Input
              type={'password'}
              variant={'disabled'}
              placeholder={'Epam@epam.com'}
              disabled
            />
            <Input
              type={'search'}
              variant={'disabled'}
              placeholder={'Input search'}
              disabled
            />
          </div>
          <div className={'flex flex-col justify-center'}>
            <Input
              type={'email'}
              variant={'error'}
              placeholder={' Epam@epam.com'}
            />
            <Input
              type={'password'}
              variant={'error'}
              placeholder={' Epam@epam.com'}
            />
            <Input
              type={'search'}
              variant={'error'}
              placeholder={'Input search'}
              error={'error text'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
