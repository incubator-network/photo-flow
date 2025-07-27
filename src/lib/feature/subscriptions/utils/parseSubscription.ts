export const parseSubscription = (subscriptionCost: string) => {
  const splitStr = subscriptionCost.split(' ')
  const price = Number(splitStr[0].slice(1))
  let type
  if (subscriptionCost.includes('1 Day')) {
    type = 'DAY'
  } else if (subscriptionCost.includes('7 Day')) {
    type = 'WEEKLY'
  } else {
    type = 'MONTHLY'
  }

  return { price, type }
}
