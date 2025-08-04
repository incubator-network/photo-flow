import * as RadioGroup from '@radix-ui/react-radio-group'
type Item = {
  title: string
  id: string
}
type RadioProps = {
  items: Item[]
  value: string
  onValueChange: (value: string) => void
} & RadioGroup.RadioGroupProps
export declare const Radio: ({
  className,
  disabled,
  items,
  ...restProps
}: RadioProps) => import('react/jsx-runtime').JSX.Element
export {}
