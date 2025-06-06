import { Typography } from '@/components/typography/Typography'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/ui/button/Button'
import { Card } from '@/components/ui/superCard/Card'
import Pagination from '@/components/pagination/Pagination'

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
      <Input errorText={'sad'} variant={'error'} />
      <Pagination
        page={2}
        itemsCountForPage={3}
        totalCount={10}
        onChange={() => {}}
      />
    </div>
  )
}
