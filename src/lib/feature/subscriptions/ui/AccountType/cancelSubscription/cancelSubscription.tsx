import { useState } from 'react'
import { useCancelSubscriptionMutation } from '@/lib/feature/subscriptions/api/subscriptionApi'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'

type PropsType = {
  hasAutoRenewal: boolean
}

export const CancelSubscription = ({ hasAutoRenewal }: PropsType) => {
  const [renewal, setRenewal] = useState(hasAutoRenewal)

  const [cancelSubscription] = useCancelSubscriptionMutation()

  const handleToggleRenewal = async (checked: boolean) => {
    debugger
    try {
      if (!checked) {
        await cancelSubscription().unwrap()
        setRenewal(false)
      }
    } catch (err) {
      console.error('Failed to cancel subscription:', err)
      setRenewal(true)
    }
  }

  return (
    <div className={'mb-6 flex justify-between'}>
      <Checkbox
        checked={renewal}
        onCheckedChange={checked => handleToggleRenewal(checked as boolean)}
        id={'agreement'}
        label={'Auto-Renewal'}
      />
    </div>
  )
}
