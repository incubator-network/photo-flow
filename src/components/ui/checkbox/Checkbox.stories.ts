import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'active', 'hover', 'focus', 'disabled'],
      control: { type: 'select' },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean', defaultValue: 'Check-box' },
    label: { control: 'text' },
  },
  args: {
    label: 'Check-box', // Общие дефолтные аргументы для всех историй
  },
}

export default meta

export const Default = {
  args: {
    variant: 'default',
    children: 'Checkbox',
  },
}
export const Active = {
  args: {
    variant: 'active',
    children: 'Checkbox',
  },
}
export const Hover = {
  args: {
    variant: 'hover',
    children: 'Checkbox',
  },
}
export const Focus = {
  args: {
    variant: 'focus',
    children: 'Checkbox',
  },
}
export const Disabled = {
  args: {
    variant: 'disabled',
    children: 'Checkbox',
    disabled: true,
  },
}
