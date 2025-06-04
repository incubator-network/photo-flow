import { Typography } from '@/components/typography/Typography'

export default function Home() {
  return (
    <div>
      <div className={'bg-danger-700 font-sans text-h1 text-center mt-20'}>
        Hello this a test string
      </div>
      <Typography variant={'h1'} className={'text-center mt-5 bg-danger-700'}>
        Typography example
      </Typography>
    </div>
  )
}
