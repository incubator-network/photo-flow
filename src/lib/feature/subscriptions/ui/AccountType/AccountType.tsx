import { Typography } from '@/components/ui/typography/Typography'
import { Card } from '@/components/ui/Card/Card'
import { Radio } from '@/components/ui/RadioGroup/RadioGroup'
import { memo, useEffect, useMemo, useState } from 'react'
import { SubscriptionCost } from '@/lib/feature/subscriptions/ui/AccountType/SubscriptionCost/SubscriptionCost'
import { CurrentSubscription } from '@/lib/feature/subscriptions/ui/AccountType/currentSubscription/CurrentSubscription'
import { useGetCurrentSubscriptionQuery } from '@/lib/feature/subscriptions/api/subscriptionApi'
import Loader from '@/components/ui/loader/Loader'

export const AccountType = memo(() => {
  const accountTypeOptions = [
    { title: 'Personal', id: 'personal-id' },
    { title: 'Business', id: 'business-id' },
  ]

  const { data, isLoading } = useGetCurrentSubscriptionQuery()

  const currentSubscriptions = useMemo(() => data, [data])

  const [accountType, setAccountType] = useState<string>('')

  useEffect(() => {
    if (!isLoading && data) {
      setAccountType(data.data.length ? 'Business' : 'Personal')
    }
  }, [data, isLoading])

  if (isLoading) return <Loader />
  if (!accountType) return null

  return (
    <>
      <CurrentSubscription currentSubscriptions={currentSubscriptions} />
      <Typography variant={'h3'} className={'mb-4.5'}>
        Account type:
      </Typography>
      <Card className={'mb-10.5 px-3 py-1.5'}>
        <Radio
          className={'flex-col gap-3'}
          items={accountTypeOptions}
          value={accountType}
          onValueChange={setAccountType}
        />
      </Card>
      {accountType === 'Business' && <SubscriptionCost hasSubscription={data?.data.length} />}
    </>
  )
})

AccountType.displayName = 'AccountType'
